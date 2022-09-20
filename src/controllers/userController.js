const userModdel= require('../models/userModel')



const createUser= async (req,res)=>{
    try{
    let data = req.body
    
    let savedData= await userModdel.create(data)
    res.status(201).send({status:true, data: savedData})
    }
    catch(err){
        res.status(500).send({status:false, msg:err.message})
    }
}


module.exports={createUser}