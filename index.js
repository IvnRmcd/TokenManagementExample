require('dotenv').config();
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT
const app = express()
const user = require('./routes/user')
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


db.sequelize.sync().then().catch(err => {
    console.log(err)
})
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})