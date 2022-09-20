const userModel= require('../models/userModel')



const validUser= async (req,res,next) => {
    try{
        let data =req.body
        let title= ["Mr", "Mrs", "Miss"]
        let(title,name,phone,email,password)=data

        if(Object.keys(data).length==0){
            res.status(400).send({status:false, msg:"please enter credential data"})
        }
        if(!title || Object.keys(title).length==0){
            res.status(400).send({status:false, msg:"Please enter tital and valid details "})
        }

    }
    catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}



module.exports={validUser}