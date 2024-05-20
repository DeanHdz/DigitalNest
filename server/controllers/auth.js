const { request, response } = require('express');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = (req = request, res = response) => {

    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({
            msg: "Faltan campos por llenar"
        });
    }

    User.findOne({ user: user, password: password }).then(
        (result) => {
            if (result) {
                //Generacion de nuestro JWT
                generateJWT(user).then(
                    (token) => {
                        res.status(200).json({
                            msh: "Login OK",
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
                msg: "Error al iniciar sesión"
            })
        }
    )
}

module.exports = {
    login
}