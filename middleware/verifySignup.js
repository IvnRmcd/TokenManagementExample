const db = require('../models')
const User = db.User


checkDuplicateEmail = (req,res,next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user){
            res.status(400).json({message: 'Failed Email already in Use'})
            return
        }
        next();
    })
}

const verifySignup = {
    checkDuplicateEmail
}

module.exports = verifySignup