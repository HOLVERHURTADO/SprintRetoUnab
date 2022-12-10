var express = require("express");
var CarController = require("../controllers/car");

var router = express.Router();

router.post("/guardarCar", CarController.save);
router.delete("/eliminarCar/:id", CarController.eliminar);
router.put("/actualizarCar/:id", CarController.update);
router.get("/Cars", CarController.listarCars);
router.get("/Car/:id", CarController.mostrarCar);


module.exports = router;