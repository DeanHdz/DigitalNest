const jwt = require('jsonwebtoken');

const generateJWT = (_id = '', username = '', email = '', role = '') => {
    return new Promise((resolve, reject) => {
        const payload = { _id, username, email, role };

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '4h' },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(token);
                }
            })
    })
}

module.exports = {
    generateJWT
}
