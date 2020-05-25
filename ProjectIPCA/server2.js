const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 5000

const PostSQLdb= require('./config/database')


const api = require('./routes/api2')
const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use('/api2', api)

app.get('/', function (req, res) {
    res.send('Hello from server')
})

app.listen(PORT, function () {
    console.log('Server running on localhost:' + PORT)
})
