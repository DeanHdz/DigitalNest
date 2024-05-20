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
                generateJWT(email).then(
                    (token) => {
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