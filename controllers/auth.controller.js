const db = require('../models')
const config = require('../config/auth.config')
const {User, RefreshToken} = db

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const authController = {
    login:  (req,res) => {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(async (user)=> {
            if (!user){
                return res.status(400).json({message: `User not found`})
            }

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

            if (!passwordIsValid){
                return res.status(400).json({message:`Password is Invalid`})
            }

            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: config.jwtExpiration
            })

            let refreshToken = await RefreshToken.createToken(user)

            res.status(200).json({
                id: user.id,
                email: user.email,
                accessToken: token,
                refreshToken: refreshToken
            })

        }).catch(err => {
            res.status(500).json({message: err.message})
        })
    }, 

    refreshToken: async (req,res) => {
        const {refreshToken: requestToken } = req.body

        if (requestToken === null){
            return res.status(403).json({message: `Refresh Token is required`})
        }

        try {
            let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
        
            console.log(refreshToken)
        
            if (!refreshToken) {
              res.status(403).json({ message: "Refresh token is not in database!" });
              return;
            }
        
            if (RefreshToken.verifyExpiration(refreshToken)) {
              RefreshToken.destroy({ where: { id: refreshToken.id } });
              
              res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
              });
              return;
            }
        
            const user = await refreshToken.getUser();
            let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: config.jwtExpiration,
            });
        
            return res.status(200).json({
              user:user.email,
              accessToken: newAccessToken,
              refreshToken: refreshToken.token,
            });
          } catch (err) {
            return res.status(500).json({ message: err.message });
          }
    }

}


module.exports = authController