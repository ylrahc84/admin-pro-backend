const jwt = require('jsonwebtoken');


const generaJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '14h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo ejecutar JWT');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generaJWT
}