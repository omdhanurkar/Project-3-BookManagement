const validator = require("../validator/validator");




const userlogin = async (req,res) =>{
    try {
    const body = req.body;
    const {email,password} = body;
     
    const empty = Object.keys(body).length;

    if(empty == 0) return res.status(400).send({status:false ,data : "plss fill some data"}); 

    // ------------------------checking email----------------------------------------------
    if(validator.isValidBody(email) || validator.isValidEmail(email)) 
    return res.status(400).send({status:false ,data : "plss provide a proper email"}); 

    const oldemail = await usermodel.findone({email});
    if(oldemail) return res.status(400).send({status:false ,data : "email is already registered"}); 

    // -------------------------checking password--------------------------------------------
     if(validator.isValidBody(password)  || validator.isValidPass(password))  
     return res.status(400).send({status:false ,data : "plss provide a proper password"}); 
      
     const oldpass = await usermodel.findone({password});
     if(oldpass) return res.status(400).send({status:false ,data : "password is already registered"}); 

    //  ---------------veryfying user--------------------------------------------------
     const existUser = await usermodel.findOne({email});
     if (!existUser)   return res.status(401).send({ status: false, message: "Register yourself" }) 

      //-------------------------------token generation-------------------------------
      const token = jwt.sign({ authorId: existUser._id, group: "69" }, process.env.SECRET_KEY);
      res.setHeader("x-api-key", token)
      return res.status(200).send({ status: true, token: token })
    } catch (err){
        return res.status(500).send({ status: false, error: err.message });
    }
  }

  module.exports = {userlogin};