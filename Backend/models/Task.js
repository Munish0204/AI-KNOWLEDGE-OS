const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    title:{
        type:String,
        required:true
    },

    description:String,

    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Medium"
    },

    completed:{
        type:Boolean,
        default:false
    },

    dueDate:Date

},
{
    timestamps:true
});

module.exports = mongoose.model("Task",taskSchema);