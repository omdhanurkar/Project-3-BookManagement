const mongoose = require('mongoose')
const validUser=require("../validation/validUser")
const BookModel= require('../models/bookModel')
const userModel = require("../models/userModel")
// const ObjectId = mongoose.Schema.Types.ObjectId

//-----------------------creating Books--------------------

const createBook = async function(req , res){
    try {
        let data = req.body
        // console.log(data)
        let userId = data.userId
        // console.log(userId)
        let isValid = mongoose.Types.ObjectId.isValid(userId)
        
        if(isValid == false) return res.status(400).send({status : false , msg : "Invalid length of UserId"})

        let result = await userModel.findById(userId)
        if(!result) return res.status(400).send({status : false , msg : "Please enter the registerd UserId"})

        let finalData = await BookModel.create(data)
        return res.status(201).send({status : true ,msg: "created book" , data : finalData})

    } catch (error) {
        return res.status(500).send({ status : false , msg : error.msg })
    }
}

module.exports.createBook = createBook