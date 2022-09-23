const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const BookController = require('../controllers/bookcontroller')
const ReviewController = require('../controllers/reviewcontroller')
const validtaion = require('../validation/validator')
const { Authentication, Authorisation } = require('../middleware/auth')

//----------dummy---------------------------------------------------------------------------------------------------------------------
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//------------create user------------------------------------------------------------------------------------------------------------------------
router.post("/register/users", validtaion.myValidUser, userController.createUser)

//-------------login------------------------------------------------------------------------------------------------------------------------
router.post("/login/userlogin", userController.login)

//-----------create book---------------------------------------------------------------------------------------------------------------------
router.post("/books", Authentication ,validtaion.bookValidation , BookController.createBook)

//------------get books-----------------------------------------------------------------------------------------------------------------------
router.get("/books",Authentication , BookController.getbook)

//--------get by params---------------------------------------------------------------------------------------------------------------------
router.get("/books/:bookId",Authentication, BookController.getBookByParams)

//------------ update books ------------------------------------------------------------------------------------------------------------ 

router.post("/books", Authentication ,validtaion.bookValidation , BookController.updateBook)

//-------------delete books-------------------------------------------------------------------------------------------------------------------
router.delete("/books/:bookId", Authentication, Authorisation, BookController.deleteBook)

//-----------------------------update----------------------------------------------------------------------------

router.put("/books/:bookId", Authentication,Authorisation, BookController.updateBook)

//--------------------------review-------------------------
router.post("/books/:bookId/review", ReviewController.reviews)

//-----------------updating the review------------------------
router.put("/books/:bookId/review/:reviewId" , ReviewController.updateReview)

//-----------------deletereview-----------------------
router.delete("/books/:bookId/review/:reviewId",ReviewController.deleteReview)


//--------------- this is to check if the end point of local host/server valid or not --------------------------------------------------------
// router.all("/*", function (req, res) {
//     res.status(400).send({status: false, message: "Make Sure Your Endpoint is Correct !!!"
//     });
// });


module.exports = router
