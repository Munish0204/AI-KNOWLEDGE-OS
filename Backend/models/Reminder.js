const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    title:String,

    message:String,

    reminderDate:Date,

    status:{
        type:String,
        default:"Pending"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Reminder",reminderSchema);