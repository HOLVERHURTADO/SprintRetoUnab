var validator = require("validator");
var Car = require("../models/Car");
const { param } = require("../routes/car");

//Contoladores que iran conectados a los servicios que necesitamos
var controller ={
    save: function (req,res) {
        var params = req.body;      //Se instalada body.
        var validate_brand = !validator.isEmpty(params.brand);
        var validate_model = !validator.isEmpty(params.model);
        var validate_year= !validator.isEmpty(params.year);
        var validate_description= !validator.isEmpty(params.description);
        
        if (validate_brand && validate_model && validate_year && validate_description) {
        var car = new Car();
        car.brand=params.brand;
        car.model=params.model;
        car.year=params.year;
        car.description=params.description;
        console.log(car);
        car.save((err, carStored)=>{
                if(err || !carStored){
                    return res.status(404).send({
                        message: "Carro no guardado",
                        status :"error"
                    });
                }
                return res.status(200).send({
                    message:"Carro guardado",
                    car
                });
            
            });
        }else {
            return res.status(404).send({
                message: "Validación de datos incorrecto"
            });
        }

    },
    eliminar: function (req,res) {
        var carId = req.params.id;
        Car.findOneAndDelete({_id:carId},(err,carRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!carRemoved){
                return res.status(400).send({
                    message:"El carro no se pudo eliminar",
                    status:"Error"
                });
            }  
            return res.status(200).send({
                message:"Carro eliminado exitosamente",
                carRemoved
            });
        })
    },
    update: function (req, res) {
        var params = req.body;
        var carId = req.params.id;
        console.log(carId);
        var validate_brand = !validator.isEmpty(params.brand);
        var validate_model= !validator.isEmpty(params.model);
        var validate_year = !validator.isEmpty(params.year);
        var validate_description = !validator.isEmpty(params.description);
        if (validate_brand && validate_model && validate_year && validate_description) {

            var update = {
                    brand: params.brand,
                    model: params.model,
                    year: params.year,
                    description: params.description,
            }

            Car.findOneAndUpdate({_id:carId }, update, { new: true }, (err, carUpdate) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error en la petición",
                        status: "Error"
                    });
                }

                if (!carUpdate) {
                    return res.status(400).send({
                        message: "Carro no actualizado",
                        status: "Error"
                    });
                }

                return res.status(200).send({
                    message: "Carro actualizado correctamente",
                    status: "success",
                    carUpdate
                });
            })

        }else {
            return res.status(404).send({
                message: "Validación de datos invalido"
            });
        }
    
    },
    listarCars: function (req,res) {
        Car.find(function(err,doc){
            console.log(doc); 
            return res.status(200).send({ //Status indica si es correcto o no la ejecución
                messasge:"Carros",
                doc //Esta mostrando la lista de usuarios en la consola
            });
        });
    },
mostrarCar: function (req,res) {
    var carId=req.params.id;
    Car.findById(carId).exec((err,car)=>{
        if(err){
            return res.status(500).send({
                car:"Error en la petición",
                status:"Error"
            });
        }

        if(!car){
            return res.status(400).send({
                message:"Carro no encontrado",
                status:"Error"
            });
        } 
        return res.status(200).send({
            message:"Este es un carro",
            car
        });  
    })
}

}

module.exports=controller;