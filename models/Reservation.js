const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservationSchema = Schema({

    reservationStart: Date ,
    reservationEnd: Date,
    status: String
})

module.exports = mongoose.model("Reservation", ReservationSchema);