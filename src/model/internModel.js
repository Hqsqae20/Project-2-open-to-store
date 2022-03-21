const mongoose = require("mongoose");
const objectId= mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    collegeId:{
        type:objectId,
        ref:"collegeModel"
    } ,
    isDeleted: { type:Boolean, default: false }
});

module.exports=mongoose.model("internModel",internSchema);