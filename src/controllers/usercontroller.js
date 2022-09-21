const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')


//====================== user creation ==============================================================================================

const createUser = async (req, res) => {
  try {
    let data = req.body

    let savedData = await userModel.create(data)
    return res.status(201).send({ status: true, msg: "created succesfully", data: savedData })
  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}

//======================== user login ==============================================================================================

const login = async (req, res) => {
  try {

    let emailId = req.body.email
    let Password = req.body.password

    let userLogin = await userModel.findOne({ email: emailId, password: Password })
    if (!userLogin)
      return res.status(401).send({ status: false, msg: "invalid login details" })


    //-------------------------------token generation--------------------------------------------------------------------------------------------
    const newtoken = jwt.sign(
      {
        userId: userLogin._id,
        group: "45", iat: Math.floor(Date.now() / 1000) - 30
      }, "group-45",
      { expiresIn: "24h" });

    return res.status(200).send({ status: true, msg: "login succesfully", token: newtoken });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
}


module.exports = { createUser, login };
