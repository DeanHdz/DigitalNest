const jwt = require('jsonwebtoken');

const generateJWT = (_id = '', username = '', email = '', role = '') => {
    return new Promise((resolve, reject) => {
        const payload = { _id, username, email, role }; //Los atributos que decidi guardar en el token para mayor conveniencia, se reciben desde auth.js en el servidor

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '4h' },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    //console.log("payload: " + payload._id + " " + payload.username + " " + payload.email + " " + payload.role, "token: " + token); //Ver como se guardan los atributos del usuario en el token, y mostrar token final
                    resolve(token);
                }
            })
    })
}

module.exports = {
    generateJWT
}
