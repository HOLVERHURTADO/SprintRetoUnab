const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GamaSchema = Schema({

    name: String,
    description: String,

})

module.exports = mongoose.model("Gama", GamaSchema);