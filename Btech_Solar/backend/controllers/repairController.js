const Repair = require('../models/repairModel')
const mongoose = require('mongoose')

//GET all repairs
const getRepairs = async (req, res) => {
    const repairs = await Repair.find({}).sort({createdAt: -1})

    if(!repairs) {
        return res.status(404).json({error: 'No data found'})
    }

    res.status(200).json(repairs)
}
    

//GET a single repair
const getRepair = async (req, res) => {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such repair'})
    }


    const repair = await Repair.findById(id)

    if(!repair) {
        return res.status(404),json({erroer: 'No such repair'})
    }

    res.status(200).json(repair)

}


//CREATE new repair
const createRepair = async (req, res) => {
    const {projectId, serviceDate, cost, description}= req.body

    //add doc to bd
    try {
        const repair = await Repair.create({projectId, serviceDate, cost, description})
        res.status(200).json(repair)
    } catch (error){
        res.status(400).json({error: error.message})
    }

}

//DELETE a repair
const deleteRepair = async (req, res) => {
    const {id}= req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such repair'})
    }

    const repair = await Repair.findOneAndDelete({_id: id})

    if(!repair) {
        return res.status(404),json({erroer: 'No such repair'})
    }

    res.status(300).json(repair)

}


//UPDATE a repair
const updateRepair = async (req, res) => {
    const {id}= req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such repair'})
    }

    const repair = await Repair.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!repair) {
        return res.status(404),json({erroer: 'No such repair'})
    }

    res.status(300).json(repair)
}

module.exports = {
    getRepairs,
    getRepair,
    createRepair,
    deleteRepair,
    updateRepair
}