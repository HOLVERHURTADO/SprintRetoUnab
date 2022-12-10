const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdminSchema = Schema({
    
    name: String,
    email: String,
    password: String

})

module.exports = mongoose.model("Admin", AdminSchema);