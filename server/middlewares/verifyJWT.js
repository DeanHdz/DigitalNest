const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const User = require('../models/user');

const validateJWT = (req = request, res = response, next) => {

    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({
            msg: "Token no encontrado"
        });
        return;
    }

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);
        User.findOne({ _id: _id }).then(
            (result) => {
                if (result) {
                    req.userActive = result;
                    next();
                } else {
                    res.status(401).json({
                        msg: "Token invalido (Usuario no encontrado)"
                    });
                    return;
                }
            }).catch((error) => {
                res.status(500).json({
                    msg: "Error en el servidor"
                });
                return;
            });
    } catch (error) {
        res.status(401).json({
            msg: "Token invalido (Error en la verificacion)"
        });
        return;
    }

}

module.exports = {
    validateJWT
}