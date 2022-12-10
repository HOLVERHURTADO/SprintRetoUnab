var validator = require("validator");
var Admin= require("../models/Admin");
const { param } = require("../routes/admin");

var controller = {
    save: function (req, res) {
        var params = req.body;
        var validate_name = !validator.isEmpty(params.name) && !validator.isNumeric(params.name);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);
        
        if (validate_name && validate_email && validate_password) {
            var admin = new Admin();
            admin.name = params.name;
            admin.email = params.email;
            admin.password = params.password;
            console.log(admin);
            admin.save((err, adminStored) => {
                if (err || !adminStored) {
                    return res.status(404).send({
                        message: "El administrador no se guardó",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message: "Administrador guardado",
                    adminStored
                });
            });

        } else {
            return res.status(404).send({
                message: "Validación de datos incorrecto"
            });
        }

    },

    update: function (req, res) {
        var params = req.body;
        var adminId = req.params.id;
        console.log(adminId);
        var validate_name = !validator.isEmpty(params.name) && !validator.isNumeric(params.name);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);
        if (validate_name && validate_email && validate_password) {

            var update = {
                name: params.name,
                email: params.email,
                password: params.password
            }

            Admin.findOneAndUpdate({_id:adminId }, update, { new: true }, (err, adminUpdate) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error en la petición",
                        status: "Error"
                    });
                }

                if (!adminUpdate) {
                    return res.status(400).send({
                        message: "Administrador no actualizado",
                        status: "Error"
                    });
                }

                return res.status(200).send({
                    message: "Actualizado correctamente",
                    status: "success",
                    adminUpdate
                });
            })


        } else {
            return res.status(404).send({
                message: "Validación de datos invalido"
            });
        }

    },

    eliminar: function (req, res) {
        var adminId = req.params.id;
        Admin.findOneAndDelete({ _id: adminId }, (err, adminRemoved) => {
            if (err) {
                return res.status(500).send({
                    message: "Error en la petición",
                    status: "Error"
                });
            }

            if (!adminRemoved) {
                return res.status(404).send({
                    message: "Administrador no eliminado",
                    status: "Error"
                });
            }

            return res.status(200).send({
                message: "Eliminado exitosamente",
                administrador: adminRemoved
            });
        })

    },

    listarAdmins: function (req, res) {

        Admin.find(function (err, doc) {
            console.log(doc);
            return res.status(200).send({
                message: "Administradores",
                doc
            });
        });
    },

    mostrarAdmin: function (req, res) {
        var adminId = req.params.id;
        Admin.findById(adminId)
            .exec((err, admin) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error en la petición",
                        status: "Error"
                    });
                }

                if (!admin) {
                    return res.status(404).send({
                        message: "Administrador no encontrado",
                        status: "Error"
                    });
                }
                return res.status(200).send({
                    message: "Este es un administrador",
                    admin
                });
            })

    }
}


module.exports = controller;