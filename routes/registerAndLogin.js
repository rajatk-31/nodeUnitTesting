const jwt = require('jsonwebtoken')

const dbLogin = require('../models/userLogin')

const register = async (req, res) => {
  try {
    if (!req.body.email || !req.body.name || !req.body.password) {
      return res.status(400).json({
        success: false,
        msg: "Please provide all details."
      })
    }

    let loginData = await dbLogin.findOne({ email: req.body.email });
    if (!loginData || loginData == null) {
      await new dbLogin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).save();

      return res.status(201).json({
        success: true,
        msg: "New user registered."
      })
    }

    return res.status(302).json({
      success: false,
      msg: "User already exists"
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Interval server error. Please try again after some time."
    })
  }
}

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        msg: "Please provide all details."
      })
    }

    let loginData = await dbLogin.findOne({ email: req.body.email });
    if (!loginData || loginData == null) {
      return res.status(204).json({
        success: false,
        msg: "Please register first."
      });
    } else if (req.body.password != loginData.password) {
      return res.status(400).json({
        success: false,
        msg: "Password mismatch"
      })
    }

    const token = jwt.sign({ name: loginData.name, email: loginData.email }, req.app.get('secret'))
    return res.status(200).json({
      success: true,
      msg: "User login successfull",
      token: token
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Interval server error. Please try again after some time."
    })
  }
}

module.exports = {
  register: register,
  login: login
}