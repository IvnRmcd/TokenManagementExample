const db = require('../models')
const bcrypt = require('bcrypt')
const utilities = require('../utility/utilities')
let jwt = require("jsonwebtoken")
const config = require('../config/auth.config')
const User = db.User



const userController = {
    Register: async(req,res) => {

        if (utilities.missingParams(req.body)){
            return res.status(400).json({
                message: `Please check your submission, something is missing`
            })
        } else 
        {
                User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10)
                }).then(
                    res.status(200).json({
                        message: `Registration Successful`
                    })
                ).catch(err => {
                    res.json(400).json({
                    message: err
                })
            }) 
        }
    },


    login: async(req,res) => {
        if(utilities.missingParams(req.body)){
            return res.status(400).json({
                message: `Please check your submission, something is missing`
            })
        } else {
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(user => {
                if (!user){
                    return res.status(400).json({message: `Email not found`})
                }
                let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

                if (!passwordIsValid){
                    return res.status(401).json({
                        accessToken: null,
                        message: `Invalid Password`
                    })
                }

                let token = jwt.sign({id: user.id}, config.secret, {
                    expiresIn: 86400
                } )

                res.status(200).json({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    accessToken: token
                })
            }).catch(err => {
                res.status(500).json({message: err.message})
            })
        }
    }
}
module.exports = userController