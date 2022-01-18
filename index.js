require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const user = require('./routes/user')
const dashboard = require('./routes/dashboard')
const db = require('./models')

let corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(express.json())
app.use(cors(corsOptions))


app.get('/', (req,res) => {
    res.json('Working correctly')
})

app.use('/user', user)
app.use('/dashboard', dashboard)


db.sequelize.sync().then().catch(err => {
    console.log(err)
})


module.exports = app