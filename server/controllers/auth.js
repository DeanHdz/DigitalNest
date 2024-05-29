const { request, response } = require('express');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = (req = request, res = response) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msg: "Faltan campos por llenar"
        });
    }

    User.findOne({ email: email, password: password }).then(
        (result) => {
            if (result) {
                //Generacion de nuestro JWT
                //const id = result._id.toString(); //Remover "new ObjectId('... " para solo tener el puro string del id

                const { _id, username, email, role } = result;
                
                //EXPERIMENTOS PARA VER COMO FUNCIONA EL Payload
                    //console.log("Resultado consulta login: " + result);
                    //const { _id } = result;
                    //console.log(_id);
                    //const id = _id.toString();
                    //console.log(id);

                //Incluir dentro de generateJWT los atributos del usuario que se desean incluir en el token, elegi incluir el id del usuario, nombre, correo y rol.
                generateJWT(_id, username, email, role).then(
                    (token) => {
                        //console.log(token);
                        res.status(200).json({
                            msg: "Login OK",
                            token
                        })
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            msg: error
                        })
                    }
                )
            } else {
                res.status(401).json({
                    msg: "Usuario o contraseña incorrectos"
                })
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg: "Error al iniciar sesión" + error
            })
        }
    )
}

const register = (req = request, res = response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            msg: "Faltan campos por llenar"
        });
    }

    const user = new User({ username, email, password });
    user.save().then(
        (user) => {
            res.status(201).json({
                msg: "User created"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "User not created: " + error
            });
        }
    );
}

module.exports = {
    login,
    register
}