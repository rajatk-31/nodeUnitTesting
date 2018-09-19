const dbLogin = require('../models/userLogin')
const jwt = require('jsonwebtoken')

const register = (req, res) => {
    if (!req.body.email || !req.body.name || !req.body.password) {
        res.status(400).json({
            success: false,
            msg: "Please provide all details."
        })
    } else {
        dbLogin.findOne({ email: req.body.email }, (err, loginData) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: "Interval server error. Please try again after some time."
                })
            } else if (!loginData || loginData == null) {
                new dbLogin({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }).save((err, saved) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            msg: "Interval server error. Please try again after some time."
                        })
                    } else {
                        res.status(201).json({
                            success: true,
                            msg: "New user registered."
                        })
                    }
                })
            } else {
                res.status(302).json({
                    success: false,
                    msg: "User already exists"
                })
            }
        })
    }
}

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            success: false,
            msg: "Please provide all details."
        })
    } else {
        dbLogin.findOne({ email: req.body.email }, (err, loginData) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: "Interval server error. Please try again after some time."
                })
            } else if (!loginData || loginData == null) {
                res.status(204).json({
                    success: false,
                    msg: "Please register first."
                })
            } else if (req.body.password != loginData.password) {
                res.status(400).json({
                    success: false,
                    msg: "Password mismatch"
                })
            } else {
                const token = jwt.sign({ name: loginData.name, email: loginData.email }, 'secret')
                res.status(200).json({
                    success: true,
                    msg: "User login successfull",
                    token: token
                })
            }
        })
    }
}

module.exports = {
    register: register,
    login: login
}