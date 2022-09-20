
const validUser=require("../validation/validUser")
const userModel= require('../models/userModel')

const jwt=require('jsonwebtoken')

const createUser= async (req,res)=>{
    try{
    let data = req.body
    
    let savedData= await userModel.create(data)
    res.status(201).send({status:true,msg: "created succesfully", data: savedData})
    }
    catch(err){
        res.status(500).send({status:false, msg:err.message})
    }
}









  const login = async (req,res) =>{
    try {
    
    let emailId= req.body.email
    let Password= req.body.password
    
    let userLogin= await userModel.findOne({email:emailId,password:Password})
    if(!userLogin)
    return res.status(401).send({status:false,msg:"invalid login details"})

     
      //-------------------------------token generation-------------------------------
      const token = jwt.sign(
        { 
        userId: userLogin._id,
        group: "45" },"group-45", 
        {expiresIn : "24h"});

      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      
      const newobj = {
        token : token,
        userId : userLogin._id,
        iat : today.toLocaleDateString(),
        expires: new Date(Date.now() + 24*60*60*1000)
        
      } 
      return res.status(200).send({ status: true,msg:"login succesfully", token: newobj });
    } catch (err){
        return res.status(500).send({ status: false, error: err.message });
    }
  }


  module.exports = {createUser,login};
