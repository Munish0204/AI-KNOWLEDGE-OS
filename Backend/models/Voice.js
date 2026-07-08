const mongoose = require("mongoose");

const voiceSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    audioFile:String,

    transcript:String,

    duration:Number

},
{
    timestamps:true
});

module.exports = mongoose.model("Voice",voiceSchema);