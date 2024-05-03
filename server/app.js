require('dotenv').config(); //Utilizar en paquete de dotenv
const Server = require('./models/server'); //Importar la clase Server

const server = new Server(); //Instanciar la clase Server

server.listen(); //Llamar al metodo listen de la clase Server