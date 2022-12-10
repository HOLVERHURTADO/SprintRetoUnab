var express = require("express");
var ScoreController = require("../controllers/score");


var router = express.Router();

router.post("/guardarScore", ScoreController.save);
router.put("/actualizarScore/:id", ScoreController.update);
router.get("/Scores", ScoreController.listarScore);



module.exports = router;