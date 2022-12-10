var express = require("express");
var UserController = require("../controllers/usuario");


var router = express.Router();

router.post("/guardarUser", UserController.save);
router.put("/actualizarUser/:id", UserController.update);
router.delete("/eliminarUser/:id", UserController.eliminar);
router.get("/Users", UserController.listarUsuarios);
router.get("/User/:id", UserController.mostrarUsuario);


module.exports = router;