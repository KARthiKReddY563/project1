const mongoose = require("mongoose");
const { schema } = require("./listing");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    comment : String,
    createdAt :{
        type : Date,
        default : Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        refe:"User",
    }
});

module.exports = mongoose.model("Review", reviewSchema);