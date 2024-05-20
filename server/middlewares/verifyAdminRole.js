const { request, response } = require('express');

const verifyAdminRole = (req = request, res = response, next) => {

    if (!req.userActive) {
        res.status(401).json({
            msg: "Permiso denegado"
        });
        return;
    }

    if (req.userActive.role !== 'admin') {
        res.status(401).json({
            msg: "Permiso denegado"
        });
        return;
    }

    next();

}

module.exports = {
    verifyAdminRole
}