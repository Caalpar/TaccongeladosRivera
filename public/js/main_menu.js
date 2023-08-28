const d = document,
    $pizzeria_conetnt = d.getElementById('Pizzeria')
$settings_hours_content = d.createElement('div')

//--------Configuracion del horario
$settings_hours_Title = CreateElement('h4', { innerHTML: 'Configuracion de Horario' })

$settings_hours_content_noon_label = d.createElement('div')
$settings_hours_label_noon = CreateElement('label', { innerHTML: 'Madrugada', style: ' margin-right:30px' })
$settings_hours_content_noon = d.createElement('div')
$settings_hours_label_open_noon = CreateElement('label', { innerHTML: 'Apertura', style: ' margin-left:30px' })
$settings_hours_input_opne_noon = CreateElement('input', { type: 'time', id: 'open_noon', style: 'margin-left:5px' })
$settings_hours_label_close_noon = CreateElement('label', { innerHTML: 'Cierre', style: ' margin-left:30px' })
$settings_hours_input_close_noon = CreateElement('input', { type: 'time', id: 'close_noon', style: 'margin-left:5px' })


$settings_hours_content_morning_label = d.createElement('div')
$settings_hours_label_morning = CreateElement('label', { innerHTML: 'Mañana', style: ' margin-right:30px' })
$settings_hours_content_morning = d.createElement('div')
$settings_hours_label_open_morning = CreateElement('label', { innerHTML: 'Apertura', style: ' margin-left:30px' })
$settings_hours_input_opne_morning = CreateElement('input', { type: 'time', id: 'open_moring', style: 'margin-left:5px' })
$settings_hours_label_close_morning = CreateElement('label', { innerHTML: 'Cierre', style: ' margin-left:30px' })
$settings_hours_input_close_morning = CreateElement('input', { type: 'time', id: 'close_moring', style: 'margin-left:5px' })

$settings_hours_content_late_label = d.createElement('div')
$settings_hours_label_late = CreateElement('label', { innerHTML: 'Tarde / Noche', style: ' margin-right:30px' })
$settings_hours_content_late = d.createElement('div')
$settings_hours_label_open_late = CreateElement('label', { innerHTML: 'Apertura', style: ' margin-left:30px' })
$settings_hours_input_opne_late = CreateElement('input', { type: 'time', id: 'open_late', style: 'margin-left:5px' })
$settings_hours_label_close_late = CreateElement('label', { innerHTML: 'Cierre', style: ' margin-left:30px' })
$settings_hours_input_close_late = CreateElement('input', { type: 'time', id: 'close_late', style: 'margin-left:5px' })

$settings_hours_content.appendChild($settings_hours_Title)

$settings_hours_content_noon_label.appendChild($settings_hours_label_noon)


AppendChilds($settings_hours_content_noon, [$settings_hours_label_open_noon,
    $settings_hours_input_opne_noon,
    $settings_hours_label_close_noon,
    $settings_hours_input_close_noon
])


$settings_hours_content_morning_label.appendChild($settings_hours_label_morning)

AppendChilds($settings_hours_content_morning, [$settings_hours_label_open_morning,
    $settings_hours_input_opne_morning,
    $settings_hours_label_close_morning,
    $settings_hours_input_close_morning
])

$settings_hours_content_late_label.appendChild($settings_hours_label_late)

AppendChilds($settings_hours_content_late, [$settings_hours_label_open_late,
    $settings_hours_input_opne_late,
    $settings_hours_label_close_late,
    $settings_hours_input_close_late
])

AppendChilds($settings_hours_content, [$settings_hours_content_noon_label,
    $settings_hours_content_noon,
    $settings_hours_content_morning_label,
    $settings_hours_content_morning,
    $settings_hours_content_late_label,
    $settings_hours_content_late
])


//------Configuracion de los Dias

$settings_day_content = CreateElement('div')
$settings_day_label_monday = CreateElement('label', { innerHTML: 'Lunes', style: ' margin-right:5px' })
$settings_day_input_monday = CreateElement('input', { type: 'checkbox', id: 'monday', style: ' margin-right:30px' })

$settings_day_label_tuesday = CreateElement('label', { innerHTML: 'Martes', style: ' margin-right:5px' })
$settings_day_input_tuesday = CreateElement('input', { type: 'checkbox', id: 'tuesday', style: ' margin-right:30px' })

$settings_day_label_wedesday = CreateElement('label', { innerHTML: 'Miércoles', style: ' margin-right:5px' })
$settings_day_input_wedesday = CreateElement('input', { type: 'checkbox', id: 'wendsday', style: ' margin-right:30px' })

$settings_day_label_thursday = CreateElement('label', { innerHTML: 'Jueves', style: ' margin-right:5px' })
$settings_day_input_thursday = CreateElement('input', { type: 'checkbox', id: 'thursday', style: ' margin-right:30px' })

$settings_day_label_friday = CreateElement('label', { innerHTML: 'Viernes', style: ' margin-right:5px' })
$settings_day_input_friday = CreateElement('input', { type: 'checkbox', id: 'friday', style: ' margin-right:30px' })

$settings_day_label_saturday = CreateElement('label', { innerHTML: 'Sábado', style: ' margin-right:5px' })
$settings_day_input_saturday = CreateElement('input', { type: 'checkbox', id: 'saturday', style: ' margin-right:30px' })

$settings_day_label_sunday = CreateElement('label', { innerHTML: 'Domingo', style: ' margin-right:5px' })
$settings_day_input_sunday = CreateElement('input', { type: 'checkbox', id: 'sunday', style: ' margin-right:30px' })


$settings_day_content.appendChild($settings_day_label_monday)
$settings_day_content.appendChild($settings_day_input_monday)

AppendChilds($settings_day_content, [$settings_day_label_monday, $settings_day_input_monday,
    $settings_day_label_tuesday, $settings_day_input_tuesday,
    $settings_day_label_wedesday, $settings_day_input_wedesday,
    $settings_day_label_thursday, $settings_day_input_thursday,
    $settings_day_label_friday, $settings_day_input_friday,
    $settings_day_label_saturday, $settings_day_input_saturday,
    $settings_day_label_sunday, $settings_day_input_sunday
])

//-----Boton para enviar informacion de horario y dia de apertura del local
$set_hours_open_close = CreateElement('input', { type: 'submit', value: 'Enviar' })
$set_hours_open_close.setAttribute('onclick', 'SendHoursAndDaysSettings()')

$pizzeria_conetnt.appendChild($settings_hours_content)
$pizzeria_conetnt.appendChild($settings_day_content)
$pizzeria_conetnt.appendChild($set_hours_open_close)


function SendHoursAndDaysSettings() {

    let open_noon = $settings_hours_input_opne_noon.value
    let close_noon = $settings_hours_input_close_noon.value

    let open_morning = $settings_hours_input_opne_morning.value
    let close_morning = $settings_hours_input_close_morning.value

    let open_late = $settings_hours_input_opne_late.value
    let close_late = $settings_hours_input_close_late.value


    let monday = $settings_day_input_monday.checked
    let tuesday = $settings_day_input_tuesday.checked
    let wedesday = $settings_day_input_wedesday.checked
    let thursday = $settings_day_input_thursday.checked
    let friday = $settings_day_input_friday.checked
    let saturday = $settings_day_input_saturday.checked
    let sunday = $settings_day_input_sunday.checked


    let hours_days = {
        days: { monday, tuesday, wedesday, thursday, friday, saturday, sunday },
        hours: { morning: { open: open_morning, close: close_morning }, late: { open: open_late, close: close_late }, noon: { open: open_noon, close: close_noon } }
    }

    let send_data = { hours_days, id_pizzeria }


    fetch('/pizzeria/sethoursanddays', {
            method: 'POST',
            body: JSON.stringify(send_data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.msg)
        }).catch((error) => {
            console.log(error);
        })

}

function SetHoursAndDays(h_d) {
    $settings_day_input_monday.checked = h_d.days.monday
    $settings_day_input_tuesday.checked = h_d.days.tuesday
    $settings_day_input_wedesday.checked = h_d.days.wedesday
    $settings_day_input_thursday.checked = thursday
    $settings_day_input_friday.checked = h_d.days.friday
    $settings_day_input_saturday.checked = h_d.days.saturday
    $settings_day_input_sunday.checked = h_d.days.sunday

    $settings_hours_input_opne_noon.value = h_d.hours.noon.open
    $settings_hours_input_close_noon.value = h_d.hours.noon.close

    $settings_hours_input_opne_morning.value = h_d.hours.morning.open
    $settings_hours_input_close_morning.value = h_d.hours.morning.close

    $settings_hours_input_opne_late.value = h_d.hours.late.open
    $settings_hours_input_close_late.value = h_d.hours.late.close

}


function CreateElement(tag, options) {
    return Object.assign(document.createElement(tag), options);
}

function AppendChilds(parent, childerns) {
    for (let index = 0; index < childerns.length; index++) {
        const chil = childerns[index];
        parent.appendChild(chil)
    }

}