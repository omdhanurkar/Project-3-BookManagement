const mongoose = require('mongoose')

const bookModel = require('../models/bookModel')
// const ObjectId = mongoose.Schema.Types.ObjectId

//-----------------------creating Books--------------------

const createBook = async function(req ,res){
    try {
        let data = req.body
        let userId = data.userId
        let isValid = mongoose.Types.ObjectId.isValid(userId)
        
        // const a = await bookModel.findOne({title:data.title},{ISBN:data.ISBN})
        // console.log(a)
        // if(Object.keys(a).length==0)
        //   return res.status(401).send({status:false, msg: "pehele se hai"})
         
        if(isValid == false) return res.status(400).send({status : false , msg : "Invalid length of UserId"})

        // let result = await userModel.findById(userId)
        // if(!result) return res.status(400).send({status : false , msg : "Please enter the registerd UserId"})

        let finalData = await bookModel.create(data)
        return res.status(201).send({status : true ,msg: "created book" , data : finalData})

    } catch (error) {
        return res.status(500).send({ status : false , msg : error.message })
    }
}

module.exports.createBook = createBook