const { urlencoded }=require("body-parser")
const mongoose= require("mongoose");
require('mongoose-type-url')
const collegeSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true

    }, 
    fullName:{
        type:String,
        required:true

    } ,
     logoLink:{
         type:mongoose.SchemaTypes.Url,
         required:true

     }, 
     isDeleted: {
         type:Boolean,
         default: false

        } 
    },{timestamps:true})

module.exports=mongoose.model("collegeModel",collegeSchema);