const db = require('../models')
const bcrypt = require('bcrypt')
const utilities = require('../utility/utilities')
const User = db.User
const Role = db.Role


const userController = {
    Register: async (req,res) => {
        if(req.RegERROR){
            return res.status(400).json({message: req.RegERROR})
        }

        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }).then(user => {
            let role = Role.createRole(user)
            res.status(200).json({
                message: `Registration Successful`,
                role:role
            })
        }).catch(err => {
            res.json(400).json({
            message: err.message
        })
    }) 
    }
}
module.exports = userController