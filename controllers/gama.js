var validator = require("validator");
var Gama = require("../models/Gama");
const { param } = require("../routes/gama");

//Contoladores que iran conectados a los servicios que necesitamos
var controller ={
    save: function (req,res) {
        var params = req.body;      //Se instalada body.
        var validate_name = !validator.isEmpty(params.name);
        var validate_description = !validator.isEmpty(params.description);
        if (validate_name && validate_description) {
        var gama = new Gama();
        gama.name=params.name;
        gama.description=params.description;
        console.log(gama);
        gama.save((err, gamaStored)=>{
                if(err || !gamaStored){
                    return res.status(404).send({
                        message: "Gama no guardada",
                        status :"error"
                    });
                }
                return res.status(200).send({
                    message:"Gama guardada",
                    gama
                });

            });
        }else {
            return res.status(404).send({
                message: "Validación de datos incorrecto"
            });
        }
    },
    eliminar: function (req,res) {
        var gamaId = req.params.id;
        Gama.findOneAndDelete({_id:gamaId},(err,gamaRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!gamaRemoved){
                return res.status(400).send({
                    message:"La gama no se pudo eliminar",
                    status:"Error"
                });
            }  
            return res.status(200).send({
                message:"Gama eliminada exitosamente",
                gamaRemoved
            });
        })
    },
    update: function (req, res) {
        var params = req.body;
        var gamaId = req.params.id;
        console.log(gamaId);
        var validate_name = !validator.isEmpty(params.name);
        var validate_description = !validator.isEmpty(params.description);
        if (validate_name && validate_description) {

            var update = {
                    name:params.name,
                    description: params.description
            }

            Gama.findOneAndUpdate({_id:gamaId }, update, { new: true }, (err, gamaUpdate) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error en la petición",
                        status: "Error"
                    });
                }

                if (!gamaUpdate) {
                    return res.status(400).send({
                        message: "Gama no actualizada",
                        status: "Error"
                    });
                }

                return res.status(200).send({
                    message: "Gama actualizada correctamente",
                    status: "success",
                    gamaUpdate
                });
            })

        }else {
            return res.status(404).send({
                message: "Validación de datos invalido"
            });
        }
    
    },
    listarGamas: function (req,res) {
        Gama.find(function(err,doc){
            console.log(doc); 
            return res.status(200).send({ //Status indica si es correcto o no la ejecución
                messasge:"Gamas",
                doc //Esta mostrando la lista de usuarios en la consola
            });
        });
    },
mostrarGama: function (req,res) {
    var gamaId=req.params.id;
    Gama.findById(gamaId).exec((err,gama)=>{
        if(err){
            return res.status(500).send({
                gama:"Error en la petición",
                status:"Error"
            });
        }

        if(!gama){
            return res.status(400).send({
                message:"Gama no encontrada",
                status:"Error"
            });
        } 
        return res.status(200).send({
            message:"Esta es un gama",
            gama
        });  
    })
}

}

module.exports=controller;