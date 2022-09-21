const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const BookController = require('../controllers/bookcontroller')
const validtaion = require('../validation/validator')
const { Authentication, Authorisation } = require('../middleware/auth')

//----------dummy-------------
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//------------create user----------------
router.post("/register/users", validtaion.myValidUser, userController.createUser)

//-------------login----------------
router.post("/login/userlogin", userController.login)

//-----------create book-------------
router.post("/books", Authentication ,validtaion.bookValidation , BookController.createBook)

//------------get books---------------
router.get("/books",Authentication , BookController.getbook)

//--------get by params-------------
router.get("/books/:bookId",Authentication, BookController.getBookByParams)

//-------------delete books-----------
router.delete("/books/:bookId", Authentication, Authorisation, BookController.deleteBook)



// router.get("/books/:bookId",Authentication,bookController.getBookByParams)



// router.all('/*', function (req, res) { return res.status(404).send({ status: false, message: "endpoint is required" }) })

module.exports = router
