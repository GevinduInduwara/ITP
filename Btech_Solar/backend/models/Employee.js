
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
 
    empID : {
        type: String,
        required: true
    },
    department : {
        type : String,
        required : true,
    },
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    contactNumber : {
        type : String,
        required : true,
    },

    basicSal : {
        type : Number,
        required : true
    },
    designation: {
        type: String,
        required:true
    },
    nic: {
        type:String,
        required:true
    }
  
  })

  const Employee = mongoose.model("Employee", EmployeeSchema);
  
  module.exports = Employee;

