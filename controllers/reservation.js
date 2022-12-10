var validator = require("validator");
var Reservation = require("../models/Reservation");
const { param } = require("../routes/reservation");

var controller = {
    save: function (req, res) {
        var params = req.body;
        var validate_reservationStart = !validator.isEmpty(params.reservationStart);
        var validate_reservationEnd = !validator.isEmpty(params.reservationEnd);
        var validate_status = !validator.isEmpty(params.status);
    
        if (validate_reservationStart && validate_reservationEnd && validate_status && (params.reservationStart<params.reservationEnd)) {
            var reservation = new Reservation();
            reservation.reservationStart = params.reservationStart;
            reservation.reservationEnd = params.reservationEnd;
            reservation.status = params.status;

            console.log(reservation);
            reservation.save((err, reservationStored) => {
                if (err || !reservationStored) {
                    return res.status(404).send({
                        message: "La reserva no se guardó",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message: "Reserva Guardada"
                });
            });

        } else {
            return res.status(404).send({
                message: "Validación de reserva incorrecto"
            });
        }

    },
    eliminar: function (req, res) {
        var reservationId = req.params.id;
        Reservation.findOneAndDelete({ _id: reservationId }, (err, reservationRemoved) => {
            if (err) {
                return res.status(500).send({
                    message: "Error en la reservación",
                    status: "Error"
                });
            }

            if (!reservationRemoved) {
                return res.status(404).send({
                    message: "Reservacion no eliminada",
                    status: "Error"
                });
            }

            return res.status(200).send({
                message: "Reservación eliminada exitosamente",
                reservation: reservationRemoved
            });
        })

    },

    listarReservation: function (req, res) {

        Reservation.find(function (err, doc) {
            console.log(doc);
            return res.status(200).send({
                message: "Reservación ",
                doc
            });


        });

    },

    mostrarReservation: function (req, res) {
        var reservationId = req.params.id;
        Reservation.findById(reservationId)
            .exec((err, reservation) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error en la reserva",
                        status: "Error"
                    });
                }

                if (!reservation) {
                    return res.status(404).send({
                        message: "Reserva no encontrada",
                        status: "Error"
                    });
                }
                return res.status(200).send({
                    message: "Reservado por el usuario",
                    reservation
                });
            })

    },
    update: function (req, res) {
        var params = req.body;
        var reservationId = req.params.id;
        console.log(reservationId);
        var validate_reservationStart = !validator.isEmpty(params.reservationStart);
        var validate_reservationEnd=!validator.isEmpty(params.reservationEnd);
        var validate_status=!validator.isEmpty(params.status);
        if (validate_reservationStart && validate_reservationEnd && validate_status && (params.reservationStart<params.reservationEnd)) {

            var update = {
                reservationStart: params.reservationStart,
                reservationEnd: params.reservationEnd,
                status: params.status
            }

            Reservation.findOneAndUpdate({_id:reservationId }, update, { new: true }, (err, reservationUpdate) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error en la petición",
                        status: "Error"
                    });
                }

                if (!reservationUpdate) {
                    return res.status(400).send({
                        message: "Reserva no actualizada",
                        status: "Error"
                    });
                }

                return res.status(200).send({
                    message: "Actualizada correctamente",
                    status: "success",
                    reservationUpdate
                });
            })



        } else {
            return res.status(404).send({
                message: "Validación de datos invalido"
            });
        }

    }
}


module.exports = controller;