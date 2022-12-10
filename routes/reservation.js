var express = require("express");
var ReservationController = require("../controllers/reservation");


var router = express.Router();

router.post("/guardarReservation", ReservationController.save);
router.put("/actualizarReservation/:id", ReservationController.update);
router.delete("/eliminarReservation/:id", ReservationController.eliminar);
router.get("/Reservations", ReservationController.listarReservation);
router.get("/Reservation/:id", ReservationController.mostrarReservation);


module.exports = router;