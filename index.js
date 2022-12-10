const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;

const user_routes = require("./routes/usuario");
const message_routes = require("./routes/message");
const admin_routes = require("./routes/admin");
const car_routes = require("./routes/car");
const score_routes = require("./routes/score");
const gama_routes = require("./routes/gama");
const reservation_routes = require("./routes/reservation");

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/SpringRetoUnab", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})
    .then(() => {
        app.use("/api", user_routes);
        app.use("/api", message_routes);
        app.use("/api", admin_routes);
        app.use("/api", car_routes);
        app.use("/api", reservation_routes);
        app.use("/api", score_routes);
        app.use("/api", gama_routes);

        app.listen(port, () => {
            console.log("Servidor corriendo en el puerto", port);
        })
    })
    .catch(error => console.log(error))