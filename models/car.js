const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CarSchema = Schema({

    name: String,
    surname: String,
    email: String,
    password: String,
    image: String,
    role: String

})

module.exports = mongoose.model("Usuario", UsuarioSchema);