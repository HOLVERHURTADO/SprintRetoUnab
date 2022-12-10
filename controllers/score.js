var validator = require("validator");
var Score = require("../models/score");
const { param } = require("../routes/score");


var controller = {

    save: function (req, res) {
    
        var params = req.body;     
        var score = new Score();
        score.score=params.score;
        console.log(score);
        score.save((err, messageStored)=>{
                if(err || !messageStored){
                    return res.status(404).send({
                        message: "La puntuación no se guardo",
                        status :"error"
                    });
                }
                return res.status(200).send({
                    message:"Puntuación guardada",
                    score
                });
            });
    },

    listarScore: function (req, res) {

        Score.find(function (err, doc) {
            console.log(doc);
            return res.status(200).send({
                message: "Score ",
                doc
            });
        });
    },
    update: function (req, res) {
        var params = req.body;
        var scoreId = req.params.id;
        console.log(scoreId);
        var validate_score = !validator.isEmpty(params.score);
        if (validate_score) {

            var update = {
                score: params.score
            }

            Score.findOneAndUpdate({_id:scoreId }, update, { new: true }, (err, scoreUpdate) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error en la petición",
                        status: "Error"
                    });
                }

                if (!scoreUpdate) {
                    return res.status(400).send({
                        message: "Puntuación no actualizada",
                        status: "Error"
                    });
                }

                return res.status(200).send({
                    message: "Puntuación actualizada correctamente",
                    status: "success",
                    scoreUpdate
                });
            })

        }else {
            return res.status(404).send({
                message: "Validación de datos invalido"
            });
        }
    }
   }

module.exports = controller;