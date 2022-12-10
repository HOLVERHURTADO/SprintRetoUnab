const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = Schema({
    
    messageText: String,

})

module.exports = mongoose.model("Message", MessageSchema);