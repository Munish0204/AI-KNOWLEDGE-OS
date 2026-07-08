const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:["user","assistant"]
    },
    content:String,
    timestamp:{
        type:Date,
        default:Date.now
    }
});

const chatSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:String,
    messages:[messageSchema]
},
{
    timestamps:true
});

module.exports = mongoose.model("Chat",chatSchema);