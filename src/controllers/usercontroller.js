const validator = require("../validator/validator");
const validUser=require("../validation/validUser")
const userModel= require('../models/userModel')



const createUser= async (req,res)=>{
    try{
    let data = req.body
    
    let savedData= await userModel.create(data)
    res.status(201).send({status:true, data: savedData})
    }
    catch(err){
        res.status(500).send({status:false, msg:err.message})
    }
}





// const userlogin = async (req,res) =>{
//     try {
//     const body = req.body;
//     const {email,password} = body;
     
//     const empty = Object.keys(body).length;

//     if(empty == 0) return res.status(400).send({status:false ,data : "plss fill some data"}); 

    // ------------------------checking email----------------------------------------------
    // if(validator.isValidBody(email) || validator.isValidEmail(email)) 
    // return res.status(400).send({status:false ,data : "plss provide a proper email"}); 

    // const oldemail = await userModel.findone({email});
    // if(oldemail) return res.status(400).send({status:false ,data : "email is already registered"}); 

    // // -------------------------checking password--------------------------------------------
    //  if(validator.isValidBody(password)  || validator.isValidPass(password))  
    //  return res.status(400).send({status:false ,data : "plss provide a proper password"}); 
      
    //  const oldpass = await userModel.findone({password});
    //  if(oldpass) return res.status(400).send({status:false ,data : "password is already registered"}); 

    //  ---------------veryfying user--------------------------------------------------
    //  const existUser = await userModel.findOne({email});
    //  if (!existUser)   return res.status(401).send({ status: false, message: "Register yourself" }) 

    //   //-------------------------------token generation-------------------------------
    //   const token = jwt.sign({ userId: existUser._id, group: "45" }, process.env.SECRET_KEY);


    //   const newobj = {
    //     token : token,
    //     userId : existUser._id,
    //     exp : "skdlms",
    //     iat : Date.now()
        
    //   } 
    //   return res.status(200).send({ status: true, token: newobj });
    // } catch (err){
    //     return res.status(500).send({ status: false, error: err.message });
    // }
  // }



  const userlogin = async (req,res) =>{
    try {
    const body = req.body;
    const {email,password} = body;
     
    const empty = Object.keys(body).length;

    if(empty == 0) return res.status(400).send({status:false ,data : "plss fill some data"}); 

    // ------------------------checking email----------------------------------------------
    // if( validator.isValidEmail(email)) 
    // return res.status(400).send({status:false ,data : "plss provide a proper email"}); 

    // -------------------------checking password--------------------------------------------
    //  if( validator.isValidPass(password))  
    //  return res.status(400).send({status:false ,data : "plss provide a proper password"}); 
       

    //  ---------------veryfying user--------------------------------------------------
     const existUser = await userModel.findOne({email});
     if (!existUser)   return res.status(401).send({ status: false, message: "Register yourself" }) 

      //-------------------------------token generation-------------------------------
      const token = jwt.sign({ userId: existUser._id, group: "45" }, "group-45", {expiresIn : "24h"});

      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      
      const newobj = {
        token : token,
        userId : existUser._id,
        iat : today.toLocaleDateString(),
        expires: new Date(Date.now() + 24*60*60*1000)
        
      } 
      return res.status(200).send({ status: true, token: newobj });
    } catch (err){
        return res.status(500).send({ status: false, error: err.message });
    }
  }

  
  module.exports = {createUser,userlogin};