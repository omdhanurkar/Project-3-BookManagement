const userModel = require("../models/userModel");
const jwt= require('jsonwebtoken')

const myValidUser = async (req, res, next) => {
  try {
    let data = req.body;
    let title = ["Mr", "Mrs", "Miss"];

    const comp = ["title", "name", "phone", "email", "password", "address"];
    if (!Object.keys(data).every((elem) => comp.includes(elem)))
      return res
        .status(400)
        .send({ status: false, msg: " DAMN !! NO EXTRA KEY FIELD" });

    // to check the data in body
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "please enter credential data" });
    // if there is no tital in body
    if (!data.title)
      return res
        .status(400)
        .send({ status: false, msg: "Please enter title and valid details " });

    if (!title.includes(data.title))
      return res
        .status(400)
        .send({ status: false, msg: "Please enter  valid Mr,Mrs,Miss " });

    //name
    let Name = data.name;

    
    if (!Name)
      return res.status(400).send({ status: false, msg: "Please enter Name" });
       
      if(!/^[A-Za-z][A-Za-z0-9_]{4,29}$/.test(Name))
      return res.status(400).send({ status: false, msg: "Please enter valid name only numbers are not allowed" });
    if (typeof Name === "string" && Name.trim().length == 0)
      return res.status(400).send({ status: false, msg: "input valid NAme" });

    //phone
    if (!data.phone)
      return res
        .status(400)
        .send({ status: false, msg: "please input phone section" });
    let number = req.body.phone;
    if (await userModel.findOne({ phone: number }))
      return res
        .status(400)
        .send({ status: false, msg: "phone number is already taken" });

        // regex number
    if (!/^[6-9]\d{9}$/.test(data.phone))
      return res
        .status(400)
        .send({ status: false, msg: "Wrong Mobile Number" });

    //email
    if (!data.email)
      return res
        .status(400)
        .send({ status: false, msg: "please input email section" });

    // regex
    //email validation
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))
      return res.status(400).send({ status: false, msg: "Invalid Email Id" });

    let emailId = req.body.email;

    let validEmail = await userModel.findOne({ email: emailId });
    if (validEmail)
      return res
        .status(400)
        .send({ status: false, msg: "E-mail already taken" });

    //password
    if (!data.password)
      return res
        .status(400)
        .send({ status: false, msg: "please input password section" });

    //password validation
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(data.password)
    )
      return res
        .status(400)
        .send({
          status: false,
          msg: "Atleat 1 capital, 1 small, numbers and Length should be 8 or more in password!",
        });

    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};









module.exports = {myValidUser};






