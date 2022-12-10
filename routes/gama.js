var express = require("express");
var GamaController = require("../controllers/gama");

var router = express.Router();

router.post("/guardarGama", GamaController.save);
router.delete("/eliminarGama/:id",GamaController.eliminar);
router.put("/actualizarGama/:id", GamaController.update);
router.get("/Gamas", GamaController.listarGamas);
router.get("/Gama/:id", GamaController.mostrarGama);


module.exports = router;