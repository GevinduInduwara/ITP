const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    productName : {
        type : String,
        required: true
    },
    itemCode : {
        type : String,
        required: true
    },
    price:{
        type: Number,
        required:true
    },
    bestPrice:{
        type: Number,
        required:true
    },
    startDate : {
        type : Date,
        required: true
    },
    endDate : {
        type : Date,
        required: true
    },
    post: {
        type: String,
        required: false,
        default: null
    },
    description:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    }
})

const Promotion = mongoose.model("Promotion",promotionSchema);

module.exports = Promotion;
