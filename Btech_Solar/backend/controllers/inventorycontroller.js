const Inventory = require('../models/inventorymodel');
const mongoose = require('mongoose');

// Get all items
const getInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find({}).sort({ created: -1 });
    res.status(200).json(inventoryItems);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single item
const getInventoryItem = async (req, res) => {
  const { id } = req.params;

  try {
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such inventory'})
    }

    const inventoryItem = await Inventory.findById(id);

    if (!inventoryItem) {
      return res.status(404).json({ error: "No such inventory" });
    }

    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new item
const createInventoryItem = async (req, res) => {
  const { Itemcode, Category, Description, Brand, Price, Quantity, SellingPrice } = req.body;
  try {
    const newInventoryItem = await Inventory.create({ Itemcode, Category, Description, Brand, Price, Quantity, SellingPrice });
    res.status(200).json(newInventoryItem);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete item
const deleteInventoryItem =async(req,res)=>{
    const{id} =req.params

      const inventoryItem = await Inventory.findByIdAndDelete({_id:id})

      if (!inventoryItem) {
        return res.status(404).json({ error: "No such inventory" });
      }
      res.status(200).json(inventoryItem)
      
}

// Update item

const UpdateinventoryItem = async(req,res)=>{
    const { id } = req.params

  
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such inventory'})
    }
  
    const inventoryItem = await Inventory.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if (!inventoryItem) {
        return res.status(400).json({ error: "No such inventory" });
      }
      res.status(200).json(inventoryItem)
}

module.exports = {
  getInventoryItem,
  getInventoryItems,
  createInventoryItem,
  deleteInventoryItem,
  UpdateinventoryItem
};
