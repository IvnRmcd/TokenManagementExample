const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const { TokenExpiredError } = jwt

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError){
        return res.status(401).json({message: "Unauthorized! Access Token is expired"})
    }
    res.status(401).json({message: `Unauthorized`})
}


verifyToken = (req,res, next) => {
    let token = req.headers[`x-access-token`]

    if (!token){
        return res.status(403).json({message: "No Token provided"})
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return catchError(err, res)
        }
        req.userId = decoded.id
        next()
    })
}



const verifyJwt = {
    verifyToken
}

module.exports = verifyJwt