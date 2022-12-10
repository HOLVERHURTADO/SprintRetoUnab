const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var scoreSchema = Schema({

    score: Number

})

module.exports = mongoose.model("Score", scoreSchema);