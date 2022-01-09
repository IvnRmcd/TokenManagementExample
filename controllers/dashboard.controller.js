
const dashaboardController = {
    user: async(req,res) => {
        res.status(200).json('Working Correctly')
    },

    admin: async (req,res) => {
        res.status(200).json(`Admin Panel`)
    },

    superadmin: async (req,res) => {
        res.status(200).json(`Super Admin Panel`)
    }

}

module.exports = dashaboardController