const express = require("express");
let Promotion = require("../models/Promotion");

const router = express.Router()

//get all Promo
router.get("/",async(req,res)=> {
    const promo = await Promotion.find({}).sort({createdAt: -1})

    res.status(200).json(promo)
})

//create a new Promo
router.post("/add", async(req,res)=> {
    const {productName, itemCode, price, bestPrice, startDate, endDate, post, description, content } = req.body

    try{
        const promo = await Promotion.create({productName, itemCode, price, bestPrice, startDate, endDate, post, description, content })
        res.status(200).json(promo)
    }catch(error){
        res.status(400).json({error: error.massage})
    }
})

//get a single Promo
router.get("/:id",async(req,res)=> {
    const {id} = req.params

    const promo = await Promotion.findById(id)
 if (!promo) {
    return res.status(404).json.apply({error: 'No Promo'})
 }   
 res.status(200).json(promo)
})

//delete Promo
router.delete("/:id",async(req,res)=> {
    const {id} = req.params

    const promo = await Promotion.findOneAndDelete({_id: id})

    if (!promo) {
        return res.status(404).json.apply({error: 'No Promo'})
    }
    res.status(200).json(promo)
})

//update Promo
router.patch("/:id",async(req,res)=> {
    const {id} = req.params

    const promo = await Promotion.findOneAndUpdate({_id: id}, {...req.body})

    if (!promo) {
        return res.status(404).json.apply({error: 'No Promo'})
    }
    res.status(200).json(promo)
    
})

module.exports=router