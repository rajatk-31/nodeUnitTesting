const dbContacts = require('../models/contacts')

const newContact = (req, res) => {
    if (!req.body.name || !req.body.phone) {
        res.status(400).json({
            success: false,
            msg: "Please provide all details."
        })
    } else {
        dbContacts.findOne({ createdBy: req.decoded.email, phone: req.decoded.phone }, (err, contact) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: "Interval server error. Please try again after some time."
                })
            } else if (!contact || contact == null) {
                new dbContacts({
                    name: req.body.name,
                    phone: req.body.phone,
                    createdBy: req.decoded.email
                }).save((err, saved) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            msg: "Interval server error. Please try again after some time."
                        })
                    } else {
                        res.status(201).json({
                            success: true,
                            msg: "New contact added."
                        })
                    }
                })
            } else {
                res.status(302).json({
                    success: false,
                    msg: "Contact already exists"
                })
            }
        })
    }
}

const getAllContacts = (req, res) => {
    dbContacts.find({ createdBy: req.body.email }, (err, contacts) => {
        if (err) {
            res.status(500).json({
                success: false,
                msg: "Interval server error. Please try again after some time."
            })
        } else if (contacts.length == 0) {
            res.status(400).json({
                success: false,
                msg: "No contacts found"
            })
        } else {
            res.status(200).json({
                success: true,
                msg: "All contacts",
                contacts: contacts
            })
        }
    })
}

module.exports = {
    get: getAllContacts,
    new: newContact
}