const jwt = require('jsonwebtoken');
const config = require('config');


function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({token_error: 'Access denied. No token provided'});

    try {
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload;
        next();
    } catch(err){
        res.status(400).send({token_error: 'Invalid token'});
    }
}
module.exports = auth;