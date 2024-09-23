
const auth = require("../controllers/auth.controllers");

module.exports = (app) => {

    const router = require("express").Router()

    // router.get("/jwt", [security.checkAndValidateToken(true)], auth.refreshJWT)
    //
    // router.post("/otp", [], auth.otpManagement)

    router.post("/login", [], auth.login)
    router.post("/register", [], auth.register)

    app.use('/auth', router)
}
