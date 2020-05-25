const mongoose = require('mongoose')
const Schema= mongoose.Schema

const userSchema= new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    permission: {type: String, required: true, default: 'user'},

})

module.exports = mongoose.model('user', userSchema, 'users')