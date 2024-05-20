const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.connection_string = process.env.CONNECTION_STRING;

        this.usersPath = "/api/users";
        this.authPath = "/api/auth";

        this.middlewares();
        this.routes();
        this.db();
    }

    routes() {

        //Utilizar routes definidos en los archivos
        this.app.use(this.usersPath, require("../routes/users"));
        this.app.use(this.authPath, require("../routes/auth"));

        //Responses para cuando no encuentra la ruta solicitada
        this.app.get("*", function (req, res) {
            res.status(404).json({
                msg: "Error ruta no encontrada",
            });
        });

        this.app.post("*", function (req, res) {
            res.status(404).json({
                msg: "Error ruta no encontrada",
            });
        });

        this.app.put("*", function (req, res) {
            res.status(404).json({
                msg: "Error ruta no encontrada",
            });
        });

        this.app.delete("*", function (req, res) {
            res.status(404).json({
                msg: "Error ruta no encontrada",
            });
        });

    }

    middlewares(){
        this.app.use(express.json()); //Permitir usar json
        this.app.use(cors()); //Permitir peticiones de otros servidores
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

    db(){
        mongoose.connect(this.connection_string).then(
            () => {
            console.log("Conectado a la base de datos");
            }
        ).catch(
            (error) => {
                console.log("Error al conectar a la base de datos", error);
            }
        )
    }
}

module.exports = Server; //Exportar clase servidor