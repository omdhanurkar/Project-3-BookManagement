const express = require('express');
const router = express.Router();
const { createUser, login } = require('../controllers/userController')
const { createBook, getbook, getBookByParams, updateBook, deleteBook } = require('../controllers/bookcontroller')
const { reviews, updateReview, deleteReview } = require('../controllers/reviewcontroller')
const { myValidUser, bookValidation, reviewBook } = require('../validation/validator')
const { Authentication, Authorisation } = require('../middleware/auth')

//----------dummy---------------------------------------------------------------------------------------------------------------------
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//------------create user------------------------------------------------------------------------------------------------------------------------
router.post("/register", myValidUser, createUser)

//-------------login------------------------------------------------------------------------------------------------------------------------
router.post("/login", login)

//-----------create book---------------------------------------------------------------------------------------------------------------------
router.post("/books", Authentication, bookValidation, createBook)

//------------get books-----------------------------------------------------------------------------------------------------------------------
router.get("/books", Authentication, getbook)

//--------get by params---------------------------------------------------------------------------------------------------------------------
router.get("/books/:bookId", Authentication, getBookByParams)

//-------------delete books-------------------------------------------------------------------------------------------------------------------
router.delete("/books/:bookId", Authentication, Authorisation, deleteBook)

//-----------------------------update------------------------------------------------------------------------------------------------------

router.put("/books/:bookId", Authentication, Authorisation, updateBook)

//--------------------------create review---------------------------------------------------------------------------------------------------
router.post("/books/:bookId/review", reviewBook, reviews)

//-----------------updating the review------------------------------------------------------------------------------------------------------
router.put("/books/:bookId/review/:reviewId", updateReview)

//-----------------deletereview------------------------------------------------------------------------------------------------------------
router.delete("/books/:bookId/review/:reviewId", deleteReview)


//--------------- this is to check if the end point of local host/server valid or not --------------------------------------------------------
router.all("/*", function (req, res) {
    res.status(400).send({
        status: false, message: "Make Sure Your Endpoint is Correct !!!"
    });
});


module.exports = router
