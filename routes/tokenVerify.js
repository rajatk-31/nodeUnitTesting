const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (!req.headers.token) {
        res.status(400).json({
            success: false,
            msg: "Unauthorized request"
        })
    } else {
        jwt.verify(req.headers.token, req.app.get('secret'), (err, decoded) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    msg: "Authorization failed."
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
}