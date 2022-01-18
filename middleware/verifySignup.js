const db = require('../models')
const User = db.User
const utilities = require('../utility/utilities')


const verifySignup = {
    checkDuplicateEmail: async (req,res,next) => {
    if (utilities.missingParams(req.body))
     {
        req.RegERROR = 'Please check your submission, something is missing'
        next()
    }
       await User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user){
                req.RegERROR = 'Cannot use the selected Email'
                next()
            }
        }).catch(err => {
            if(err){
                req.RegERROR = 'Server Error'
            }
            next()
        })
        next();
    }
}

module.exports = verifySignup