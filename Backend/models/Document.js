const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    title:String,

    filename:String,

    fileUrl:String,

    fileType:String,

    size:Number

},
{
    timestamps:true
});

module.exports = mongoose.model("Document",documentSchema);