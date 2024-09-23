const jwt = require("jsonwebtoken")
require('dotenv').config()

const checkAndValidateToken = (restrict = true) => {
    return (req, res, next) => {
        console.log(req.headers)
        const sessionToken = req.headers['auth_token']
        console.log(sessionToken)
        if (sessionToken) {
            jwt.verify(sessionToken, process.env.SECRET_KEY, async (err, decoded) => {
                if (err)
                    return res.status(403).send({
                        status: 403,
                        status_message:
                            "Unable to verify token."
                    })
                else {
                    console.log('salut')
                    req.userInfo = decoded.user
                    next()
                }
            })
        }
        else {
            if (restrict)
                return res.status(403).send({
                    status: 403,
                    status_message:
                        "Unauthorized request."
                })
            else {
                req.userInfo = null
                next()
            }
        }
    }
}

const security = {
    checkAndValidateToken: checkAndValidateToken
}

module.exports = security
