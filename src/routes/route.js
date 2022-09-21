const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController')
const validtaion= require('../validation/validator')
const bookcontroller = require('../controllers/bookcontroller')
//----------dummy-------------
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/register/users", validtaion.myValidUser,userController.createUser)

router.post("/login/userlogin",userController.login)

router.post("/register/books",validtaion.bookValidation,bookcontroller.createBook)

module.exports = router