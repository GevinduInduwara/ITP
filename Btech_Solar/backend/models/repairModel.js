const mongoose = require('mongoose')

const Schema = mongoose.Schema

const repairSchema = new Schema({
    projectId: {

    },
    serviceDate: {
        type: Date,
        default: null,
        required: true
    },
    cost: {
        type: Number,
        default: null,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: false
    }
 

},{timestamps: true})

module.exports = mongoose.model('repair', repairSchema)
