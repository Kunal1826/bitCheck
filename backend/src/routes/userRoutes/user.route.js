const express = require("express")
const router = express.Router();

const userControllers = require("../../controllers/userControllers/user.controller.js")

router.post("/register",userControllers.registerController)
router.post("/login",userControllers.loginController)
router.get("/logout",userControllers.logoutController)

module.exports = router;