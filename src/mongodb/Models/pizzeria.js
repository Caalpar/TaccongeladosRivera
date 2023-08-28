const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
    precio: Number,
    descripcion: String,
    titulo: String,
    img: String,
    disponibilidad: Boolean,
    portada: Boolean
});



const categoriaSchema = new mongoose.Schema({

    categoria: String,
    color_categoria: String,
    menu: [menuSchema],

});


const pizzeriaSchema = new mongoose.Schema({
    email: String,
    name: String,
    address: String,
    phone: String,
    menus: [categoriaSchema],
    hours_days: {
        days: {
            monday: Boolean,
            tuesday: Boolean,
            wedesday: Boolean,
            thursday: Boolean,
            friday: Boolean,
            saturday: Boolean,
            sunday: Boolean
        },
        hours: {

            noon: {
                open: String,
                close: String
            },
            morning: {
                open: String,
                close: String
            },
            late: {
                open: String,
                close: String
            }
        }
    }
});


pizzeriaSchema.methods.OpenStored = function() {

    let open = false
    let early_morning = false

    let monday = this.hours_days.days.monday
    let tuesday = this.hours_days.days.tuesday
    let wedesday = this.hours_days.days.wedesday
    let thursday = this.hours_days.days.thursday
    let friday = this.hours_days.days.friday
    let saturday = this.hours_days.days.saturday
    let sunday = this.hours_days.days.sunday

    let days = [monday, tuesday, wedesday, thursday, friday, saturday, sunday]

    let days_validate = [sunday, monday, tuesday, wedesday, thursday, friday, saturday]

    let hou_open_morning = this.hours_days.hours.morning.open.split(':')
    let hou_close_morning = this.hours_days.hours.morning.close.split(':')

    let hou_open_late = this.hours_days.hours.late.open.split(':')
    let hou_close_late = this.hours_days.hours.late.close.split(':')

    let hou_open_noon = this.hours_days.hours.noon.open.split(':')
    let hou_close_noon = this.hours_days.hours.noon.close.split(':')

    let h_o_m = parseInt(hou_open_morning[0])
    let m_o_m = parseInt(hou_open_morning[1])

    let h_c_m = parseInt(hou_close_morning[0])
    let m_c_m = parseInt(hou_close_morning[1])

    let h_o_l = parseInt(hou_open_late[0])
    let m_o_l = parseInt(hou_open_late[1])

    let h_c_l = parseInt(hou_close_late[0])
    let m_c_l = parseInt(hou_close_late[1])

    let h_o_n = parseInt(hou_open_noon[0])
    let m_o_n = parseInt(hou_open_noon[1])

    let h_c_n = parseInt(hou_close_noon[0])
    let m_c_n = parseInt(hou_close_noon[1])


    const d = new Date()

    const current_hours = parseInt(d.getHours()) + (parseInt(d.getTimezoneOffset()) / 60) - 3
    const current_minutes = parseInt(d.getMinutes())
    const current_day = d.getDay()


    if ((h_o_m >= 0 && h_c_m <= 6))
        early_morning = true
    else
        early_morning = false

    let text_days = ''
    let separate = ' - '

    for (let index = 0; index < days.length - 2; index++) {



        const day = days[index];
        const next_day_1 = days[index + 1];
        const next_day_2 = days[index + 2];
        if (day && index == 0) {
            text_days = 'Lunes'
        }

        if ((next_day_1 && !next_day_2) || (!day && next_day_1)) {
            switch (index + 1) {

                case 1:
                    text_days = AddSeparateAndText(text_days, 'Martes')
                        // text_days += 'Martes'

                    break;
                case 2:
                    text_days = AddSeparateAndText(text_days, 'Miercoles')

                    break;
                case 3:
                    text_days = AddSeparateAndText(text_days, 'Jueves')

                    break;
                case 4:
                    text_days = AddSeparateAndText(text_days, 'Viernes')


                    break;
                case 5:
                    text_days = AddSeparateAndText(text_days, 'Sabado')

                    break;

            }
        }


        if ((index + 2 == days.length - 1) && next_day_2)
            text_days = AddSeparateAndText(text_days, 'Domingo')

    }


    if (days_validate[current_day]) {
        open = ValidateionOpen(h_o_n, m_o_n, h_c_n, m_c_n, current_hours, current_minutes)
        if (!open)
            open = ValidateionOpen(h_o_m, m_o_m, h_c_m, m_c_m, current_hours, current_minutes)
        if (!open)
            open = ValidateionOpen(h_o_l, m_o_l, h_c_l, m_c_l, current_hours, current_minutes)
    }


    let last_day = false

    if (current_day == 0)
        last_day = days_validate[days_validate.length - 1]
    else
        last_day = days_validate[current_day - 1]


    if (last_day && early_morning && (!days_validate[current_day]))
        open = ValidateionOpen(h_o_m, m_o_m, h_c_m, m_c_m, current_hours, current_minutes)

    return { open, text_days }
}


module.exports = mongoose.model('Pizzeria', pizzeriaSchema, 'pizzeriaCollection');

function ValidateionOpen(h_open, m_open, h_close, m_close, h_current, m_current) {
    let result = false
    if (
        h_current >= h_open &&
        h_current <= h_close
    ) {

        if (h_current == h_open) {
            if (m_current >= m_open)
                result = true

        }
        if (h_current > h_open && h_current < h_close)
            result = true

        if (h_current == h_close) {
            if (m_current <= m_close)
                result = true
            else
                result = false
        }
    }

    return result
}

function AddSeparateAndText(text, new_text) {
    if (text != '')
        text += ' - ' + new_text
    else
        text += new_text
    return text
}