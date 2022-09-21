const userModel = require("../models/userModel");
const bookModel = require("../models/bookModel")
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const myValidUser = async (req, res, next) => {

  try {
    let data = req.body;
    let title = ["Mr", "Mrs", "Miss"];

    //====================> to check the data in body <==============================================================================================================

    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "please enter credential data" });

    //--------------------> Title validation <--------------------------------------------------------------------------------------------

    if (!data.title)
      return res
        .status(400)
        .send({ status: false, msg: "Please enter title and valid details " });

    if (!title.includes(data.title))
      return res
        .status(400)
        .send({ status: false, msg: "Please enter  valid Mr,Mrs,Miss " });

    //=====================> Name validation and REGEX <===================================================================================================

    let Name = data.name;

    if (!Name)
      return res.status(400).send({ status: false, msg: "Please enter Name" });

    //-----------------------> REGEX <------------------------------------------------------------------------------------------------------------------------------

    if (!/^[A-Za-z][A-Za-z0-9_]{4,29}$/.test(Name))
      return res
        .status(400)
        .send({
          status: false,
          msg: "Please enter valid name only numbers are not allowed",
        });

    if (typeof Name === "string" && Name.trim().length == 0)
      return res.status(400).send({ status: false, msg: "input valid NAme" });

    //------------------------> Phone validation and REGEX <------------------------------------------------------------------------------------------------

    if (!data.phone)
      return res
        .status(400)
        .send({ status: false, msg: "please input phone section" });

    let number = req.body.phone;
    if (await userModel.findOne({ phone: number }))
      return res
        .status(400)
        .send({ status: false, msg: "phone number is already taken" });

    //-------------------------> REGEX <---------------------------------------------------------------------------------------------------------

    if (!/^[6-9]\d{9}$/.test(data.phone))
      return res
        .status(400)
        .send({ status: false, msg: "Wrong Mobile Number" });

    //=====================> E-mail validation and REGEX <===============================================================================      

    if (!data.email)
      return res
        .status(400)
        .send({ status: false, msg: "please input email section" });

    //-------------------------> REGEX <--------------------------------------------------------------------------------------------------------

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))
      return res.status(400).send({ status: false, msg: "Invalid Email Id" });

    let emailId = req.body.email;

    let validEmail = await userModel.findOne({ email: emailId });
    if (validEmail)
      return res
        .status(400)
        .send({ status: false, msg: "E-mail already taken" });

    //======================> Password Validation and REGEX <==============================================================================================

    if (!data.password)
      return res
        .status(400)
        .send({ status: false, msg: "please input password section" });

    //-------------------> REGEX <-----------------------------------------------------------------------------------------------------

    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,14}$/.test(
        data.password
      )
    )
      return res.status(400).send({
        status: false,
        msg: "Atleat 1 capital, 1 small, numbers and Length should be 8 or more in password!",
      });

    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


//*********************************book-Validation********************/

const bookValidation = async (req, res, next) => {
  try {

    let data = req.body
    let { title, excerpt, userId, ISBN, category, subcategory, reviews } = data
    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, msg: "Kindly input all the nessesary details" })

    //=======================title =================================================================================
    if (!title)
      return res.status(400).send({ status: false, msg: " Please input Title" })

    // if (!(typeof title == "string") || title.trim().length == 0)
      // return res.status(400).send({ status: false, msg: "invalid title" })

    if (!(/^[A-Z][a-z0-9_-]{3,}$/).test(title))
      return res.status(400).send({ status: false, msg: "first letter of title must be an uppercase" })

    let Tital = req.body.title

    let uniqTitle = await bookModel.findOne({ title: Tital })

    if (uniqTitle)
      return res.status(400).send({ status: false, msg: "This title already exists" })

    // excerpt
    if (!excerpt)
      return res.status(400).send({ status: false, msg: "input excerpt please" })

    if (!(typeof excerpt == "string") || excerpt.trim().length == 0)
      return res.status(400).send({ status: false, msg: "input valid excerpt" })

    if (!(/^[a-zA-Z][a-z_-]{3,}$/).test(excerpt))
      return res.status(400).send({ status: false, msg: "enter valid excerpt" })

    //userId
    if (!userId)
      return res.status(400).send({ status: false, msg: "input valid userId" })


    if (!userId.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).send({ status: false, msg: "invalid userId given" })


    if (!(await userModel.findById(userId)))
      return res.status(400).send({ status: false, msg: "wrong userID" })



    //isbn 

    if (!ISBN)
      return res.status(400).send({ status: false, msg: "enter  ISBN" })

    if (!(typeof ISBN == "string") || ISBN.trim().length == 0)
      return res.status(400).send({ status: false, msg: "input valid ISBN" })

    if (!/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN))
      return res.status(400).send({ status: false, msg: "Please input valid ISBN with 10 or 13 Numbers" })


    if ((await bookModel.findOne({ ISBN: ISBN })))
      return res.status(400).send({ status: false, msg: " ISBN already present" })


    //category
    if (!category)
      return res.status(400).send({ status: false, msg: "enter category" })

    if (!(typeof category == "string") || category.trim().length == 0)
      return res.status(400).send({ status: false, msg: "enter  valid category" })


    // subcategory

    if (!subcategory)
      return res.status(400).send({ status: false, msg: "enter subcategory" })

    if (!(typeof subcategory == "string") || subcategory.trim().length == 0)
      return res.status(400).send({ status: false, msg: "enter valid subcategory" })


    next();
  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
}




module.exports = { myValidUser, bookValidation };
