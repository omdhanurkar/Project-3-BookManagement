const userModel = require("../models/userModel");
const bookModel = require("../models/bookModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const myValidUser = async (req, res, next) => {
  try {
    let data = req.body;
    let title = ["Mr", "Mrs", "Miss"];

    //======================> to check the data in body <==============================================================================================================

    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, msg: "please enter credential data" });

    //--------------------> Title validation <--------------------------------------------------------------------------------------------

    if (!data.title)
      return res.status(400).send({ status: false, msg: "Please enter title and valid details " });


    if (!title.includes(data.title.trim()))
      return res.status(400).send({ status: false, msg: "Please enter  valid Mr,Mrs,Miss " });


    //=====================> Name validation and REGEX <===================================================================================================

    let Name = data.name;

    if (!Name) return res.status(400).send({ status: false, msg: "Please enter Name" });

    //-----------------------> REGEX <------------------------------------------------------------------------------------------------------------------------------

    if (!/^[A-Za-z][A-Za-z0-9_]{4,29}$/.test(Name))
      return res.status(400).send({ status: false, msg: "Please enter valid name and  only numbers are not allowed" });

    if (typeof Name === "string" && Name.trim().length == 0)
      return res.status(400).send({ status: false, msg: "input valid NAme" });

    //------------------------> Phone validation and REGEX <------------------------------------------------------------------------------------------------

    if (!data.phone)
      return res.status(400).send({ status: false, msg: "please input phone section" });

    let number = req.body.phone;
    if (await userModel.findOne({ phone: number }))
      return res.status(400).send({ status: false, msg: "phone number is already taken" });

    //-------------------------> REGEX <---------------------------------------------------------------------------------------------------------

    if (!/^[6-9]\d{9}$/.test(data.phone))
      return res.status(400).send({ status: false, msg: "Wrong Mobile Number" });

    //=====================> E-mail validation and REGEX <===============================================================================

    if (!data.email)
      return res.status(400).send({ status: false, msg: "please input email section" });

    //-------------------------> REGEX <--------------------------------------------------------------------------------------------------------

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))
      return res.status(400).send({ status: false, msg: "Invalid Email Id" });

    let emailId = req.body.email;

    let validEmail = await userModel.findOne({ email: emailId });
    if (validEmail)
      return res.status(400).send({ status: false, msg: "E-mail already taken" });

    //======================> Password Validation and REGEX <==============================================================================================

    if (!data.password)
      return res.status(400).send({ status: false, msg: "please input password section" });

    //-------------------> REGEX <-----------------------------------------------------------------------------------------------------

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/.test(data.password))
      return res.status(400).send({ status: false, msg: "Atleat 1 uppercase, 1 lowercase, 1 numberic value , 1 special character and Length should be between 8 t0 14 for password!!!" });

    //---------------adress validation--------------------------------------------------------------------------------
    let newadress = data.address;
    // empty object value is truthy so is no key present in adress in taht case also its go into if 
    if (newadress) {
      if (!newadress.street) {
        return res.status(400).send({ status: false, message: "Street address cannot be empty" })
      }
      if (!newadress.city) {
        return res.status(400).send({ status: false, message: "City cannot be empty" })
      }
      if (!newadress.pincode) {
        return res.status(400).send({ status: false, message: "Pincode cannot be empty" })
      }
      // else {return res.status(400).send({ status: false, message: "address cannot be empty" }) }
    }

    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//======================## book-Validation ##===================================================================================

const bookValidation = async (req, res, next) => {
  try {
    let data = req.body;
    let { title, excerpt, userId, ISBN, category, subcategory, reviews } = data;
    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, msg: "Kindly input all the nessesary details" });

    //========================= title =============================================================================================================
    if (!title)
      return res.status(400).send({ status: false, msg: " Please input Title" });

    //------------------------- REGEX ---------------------------------------------------------------------------------------------------------------

    if (!/^[a-zA-Z ,]+$/i.test(title))
      return res.status(400).send({ status: false, msg: "please input valid title and first letter must be of Uppercase" });

    let Tital = req.body.title;
    // uniqTitle = uniqTitle.trim().split(" ").filter(word => word).join(" ")
    //------------------------- DB call ------------------------------------------------------------------------------------------------------

    let uniqTitle = await bookModel.findOne({ title: Tital });

    if (uniqTitle)
      return res.status(400).send({ status: false, msg: "This title already exists" });



    //===========================> validation for excerpt <===================================================================================================

    if (!excerpt)
      return res.status(400).send({ status: false, msg: "input excerpt please" });

    if (!(typeof excerpt == "string") || excerpt.trim().length == 0)
      return res.status(400).send({ status: false, msg: "input valid excerpt" });
    //----------------------------> REGEX <----------------------------------------------------------------------------------------------------------------

    if (!/^[a-zA-Z][a-z_-]{3,}$/.test(excerpt))
      return res.status(400).send({ status: false, msg: "enter valid excerpt" });

    //============================> validation for UserID <================================================================================================

    if (!userId)
      return res.status(400).send({ status: false, msg: "input valid userId" });

    //-----------------------------> REGEX <--------------------------------------------------------------------------------------------
    if (!userId.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).send({ status: false, msg: "invalid userId given" });

    //-----------------------------> DB call <------------------------------------------------------------------------------------------------------
    if (!(await userModel.findById(userId)))
      return res.status(404).send({ status: false, msg: "wrong userID" });

    //=============================> validation for ISBN <====================================================================================

    if (!ISBN)
      return res.status(400).send({ status: false, msg: "enter  ISBN" });

    if (!(typeof ISBN == "string") || ISBN.trim().length == 0)
      return res.status(400).send({ status: false, msg: "input valid ISBN" });
    //-----------------------------> REGEX <---------------------------------------------------------------------------------------------------------
    if (!/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN))
      return res.status(400).send({ status: false, msg: "Please input valid ISBN with 10 or 13 Numbers" });

    //-----------------------------> DB call <------------------------------------------------------------------------------------------------
    if (await bookModel.findOne({ ISBN: ISBN }))
      return res.status(400).send({ status: false, msg: " ISBN already present" });

    //==============================> validation for category <================================================================================
    if (!category)
      return res.status(400).send({ status: false, msg: "enter category" });

    if (!(typeof category == "string") || category.trim().length == 0)
      return res.status(400).send({ status: false, msg: "enter  valid category" });

    //===============================> subcategory <========================================================================================

    if (!subcategory)
      return res.status(400).send({ status: false, msg: "enter subcategory" });

    if (!(typeof subcategory == "string") || subcategory.trim().length == 0)
      return res.status(400).send({ status: false, msg: "enter valid subcategory" });

    // calling next function --
    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { myValidUser, bookValidation };
