var express = require("express");
var MessageController = require("../controllers/message");


var router = express.Router();

router.post("/guardarMessage", MessageController.save);
router.delete("/eliminarMessage/:id", MessageController.eliminar);
router.put("/actualizarMessage/:id", MessageController.update);
router.get("/Message/:id", MessageController.mostrarMensaje);
router.get("/Messages", MessageController.listarMensajes);




module.exports = router;