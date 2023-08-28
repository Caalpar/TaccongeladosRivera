const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const orederActiveSchema = new mongoose.Schema({
    _id_oreder: String,
    oreder_active: String,
    _id_pizzeria: String,
    menus_id: [],
    date: String
});


const userSchema = new mongoose.Schema({

    user_name: String,
    email: String,
    first_name: String,
    last_name: String,
    address: String,
    neighborhood: String,
    reference: String,
    corner: String,
    phone: String,
    password: String,
    token: String,
    client: Boolean,
    pizzeria_id: String,
    my_oreders: [orederActiveSchema]
});


userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function(pass) {
    return bcrypt.compareSync(pass, this.password);
}

userSchema.methods.isClient = function() {
    return this.client;
}


module.exports = mongoose.model('Uresr', userSchema, 'userCollection');