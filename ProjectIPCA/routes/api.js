const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/userMongoDB')
const mongoose = require('mongoose')
const db = "mongodb+srv://a50738:a50738@eventagency-x03vd.mongodb.net/eventagency?retryWrites=true&w=majority"

process.env.SECRET_KEY = 'secret'

// Check if mongoose is correctly connected to database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.error('Error!' + err)
    }
    else {
        console.log('Connected to mongodb')
    }
})


// Verify the token 
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('Hello from server')
})

// Add new user do database
router.post('/register', (req, res) => {
    let userData = req.body
    if (userData.email == "" || userData.password == "" || userData.name == "" || userData.surname == "" || userData.phoneNumber == "") {
        res.send('Ensure all necessery data are provided')
    }
    else {
        User.findOne({ email: userData.email }, (error, user) => {
            if (error) {
                console.log(error)
            }
            else if (user) { res.status(409).send('This email is already taken!') }
            else {
                User.findOne({ phoneNumber: userData.phoneNumber }, (error, user) => {
                    if (error) {
                        console.log(error)
                    }
                    else if (user) { res.status(409).send('This phone number is already taken!') }
                    else {
                        let user = new User(userData)
                        user.save((error, registeredUser) => {
                            if (error) {
                                console.log(error)
                            }
                            else {
                                let payload = { subject: registeredUser._id }
                                let token = jwt.sign(payload, 'secretKey')
                                res.status(200).send({ token })
                            }
                        })
                    }

                })
            }
        })
    }
})

// Login the user
router.post('/login', (req, res) => {
    let userData = req.body
    //Check if email is existing in database
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        }
        else {
            //Check if the provided data match with found user
            if (!user) { res.status(401).send('Invalid email') }
            else if (user.password !== userData.password) { res.status(401).send('Invalid password') }
            else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token })
            }
        }
    })
})

// Get logged user permission
router.get('/userPermission', verifyToken, function (req, res) {
    // get id from verifyToken
    var id = req.userId;

    User.findOne({ _id: id }, function (err, user) {
        if (err){ return res.status(401).send('Something went wrong')}

        res.json(user.permission);
    });
});

// Get logged user email
router.get('/getCurrentUserEmail', verifyToken, function (req, res) {
    // get id from verifyToken
    var id = req.userId;

    User.findOne({ _id: id }, function (err, user) {
        if (err){ return res.status(401).send('Something went wrong')}

        res.json(user.email);
    });
});

// Delete user from database by email
router.delete("/deleteUser/:email", (req, res) => {
    User.deleteOne({ email: req.params.email } )
        .then(result => {
            res.status(200).json({ message: "User deleted!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting the user with email: " + email
            });
        })
});

module.exports = router