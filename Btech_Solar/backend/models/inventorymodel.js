const mongoose = require('mongoose')

const Schema =mongoose.Schema

const inventorySchema =new Schema({
    Itemcode: {
        type:String,
        required: true
    },
    Category:{
        type:String,
        required :true
    },
  
    Description:{
        type:String,
        required :true
    },

    Brand:{
        type:String,
        required :true
    },

    Price:{
        type:String,
        required :true,
        min: 0
    },
    Quantity:{
        type:Number,
        required :true,
        min: 0
    },

    SellingPrice:{
        type:String,
        required :true,
        min: 0
    },

    Date:{
        type:String,
        required:false,
        default: new Date().toISOString().split('T')[0]
    }
    
},{timestamps:true})

const Inventory = mongoose.model('inventory', inventorySchema);

module.exports = Inventory;

