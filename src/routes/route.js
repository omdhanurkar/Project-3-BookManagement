const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController')
const validtaion= require('../validation/validUser')
//----------dummy-------------
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/register/users", validtaion.myValidUser,userController.createUser)

module.exports = router