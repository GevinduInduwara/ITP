const express= require("express");
let Employee = require("../models/Employee");

const router = express.Router();

//get all Employee

router.get("/", async (req,res)=> {
    const employee = await Employee.find({}).sort({createdAt:-1})

    res.status(200).json(employee)
})

//create new employee

router.post("/add",async(req,res)=> {
    const {empID, department,firstName,lastName,userName,email,contactNumber, basicSal, designation, nic} = req.body

    try{
        const employee = await Employee.create({empID, department,firstName,lastName,userName,email,contactNumber, basicSal, designation, nic})
        res.status(200).json(employee)
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

//get a single employee

router.get("/:id",async(req,res)=>{
    const {id} = req.params

    const employee =  await Employee.findById(id)
    if(!employee){
        return res.status(404).json({error: 'No Employee'})
    }
    res.status(200).json(employee)
})

//update employee

router.patch("/:id",async(req,res)=>{
    const {id} = req.params

    const employee = await Employee.findOneAndUpdate({_id: id}, {...req.body})

    if(!employee){
        return res.status(404).json({error: 'No Employee'})
    }
    res.status(200).json(employee)
})


//delete employee

router.delete("/:id",async(req,res)=>{
    const {id} = req.params

    const employee = await Employee.findOneAndDelete({_id: id})

    if (!employee) {
        return res.status(404).json.apply({error: 'No Employee'})
    }
    res.status(200).json(employee)
})
module.exports = router


