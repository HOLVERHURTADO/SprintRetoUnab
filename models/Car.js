const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CarSchema = Schema({

    brand: String,
    model: String,
    year: Number,
    description: String

})

module.exports = mongoose.model("Car", CarSchema);