if (process.env.NODE_ENV !== "production")
    require('dotenv').config()

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Check if token is passed
    if (!token){
        return res.status(401).json( { msg: 'You are unauthorized. Permissions denied as token is missing'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    }
    catch(e){
        res.status(401).json( { msg: 'You are unauthorized. Permissions denied as token is invalid'})
    }
}

module.exports = auth;