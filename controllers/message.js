var validator = require("validator");
var Message = require("../models/Message");
const { param } = require("../routes/car");

//Contoladores que iran conectados a los servicios que necesitamos
var controller ={
    save: function (req,res) {
        var params = req.body;      //Se instalada body.
        var message = new Message();
        message.messageText=params.messageText;
        console.log(message);
        message.save((err, messageStored)=>{
                if(err || !messageStored){
                    return res.status(404).send({
                        message: "El mensaje no se guardo",
                        status :"error"
                    });
                }
                return res.status(200).send({
                    message:"Mensaje guardado",
                    message
                });

            });

    },
    eliminar: function (req,res) {
        var messageId = req.params.id;
        Message.findOneAndDelete({_id:messageId},(err,messageRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!messageRemoved){
                return res.status(400).send({
                    message:"El mensaje no se pudo eliminar",
                    status:"Error"
                });
            }  
            return res.status(200).send({
                message:"Mensaje eliminado exitosamente",
                messageRemoved
            });
        })
    },
    update: function (req, res) {
        var params = req.body;
        var messageId = req.params.id;
        console.log(messageId);
        var validate_messageText = !validator.isEmpty(params.messageText );
        if (validate_messageText) {

            var update = {
                messageText: params.messageText,
            }

            Message.findOneAndUpdate({_id:messageId }, update, { new: true }, (err, messageUpdate) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error en la petición",
                        status: "Error"
                    });
                }

                if (!messageUpdate) {
                    return res.status(404).send({
                        message: "Mensaje no actualizado",
                        status: "Error"
                    });
                }

                return res.status(200).send({
                    message: "Mensaje actualizado correctamente",
                    status: "success",
                    messageUpdate
                });
            })

        }else {
            return res.status(404).send({
                message: "Validación de datos invalido"
            });
        }
    
    },
    listarMensajes: function (req,res) {
        Message.find(function(err,doc){
            console.log(doc); 
            return res.status(200).send({ //Status indica si es correcto o no la ejecución
                message:"Mensajes",
                doc //Esta mostrando la lista de usuarios en la consola
            });
        });
    },
    mostrarMensaje: function (req,res) {
    var messageId=req.params.id;
    Message.findById(messageId).exec((err,message)=>{
        if(err){
            return res.status(500).send({
                message:"Error en la petición",
                status:"Error"
            });
        }

        if(!message){
            return res.status(400).send({
                message:"Mensaje no encontrado",
                status:"Error"
            });
        } 
        return res.status(200).send({
            message:"Este es un mensaje",
            message
        });  
    })
}

}

module.exports=controller;