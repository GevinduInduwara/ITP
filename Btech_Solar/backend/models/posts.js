const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postCategory:{
        type:String,
        required:true
    },
    tdate:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },

});
module.exports = mongoose.model('Post',postSchema);

