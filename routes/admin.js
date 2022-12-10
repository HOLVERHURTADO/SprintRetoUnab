var express = require("express");
var AdminController = require("../controllers/admin");


var router = express.Router();


router.post("/guardarAdmin", AdminController.save);
router.delete("/eliminarAdmin/:id", AdminController.eliminar);
router.put("/actualizarAdmin/:id", AdminController.update);
router.get("/Admins", AdminController.listarAdmins);
router.get("/Admin/:id", AdminController.mostrarAdmin);

module.exports = router;