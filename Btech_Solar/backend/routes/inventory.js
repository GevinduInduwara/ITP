const express = require('express');
const {
    getInventoryItems,
    getInventoryItem,
    createInventoryItem,
    deleteInventoryItem,
    UpdateinventoryItem
} = require('../controllers/inventorycontroller');

const router = express.Router();

// Get all items
router.get('/', getInventoryItems);

// Get single item
router.get('/:id', getInventoryItem);

// POST a new item
router.post('/add', createInventoryItem);

// DELETE an item
router.delete('/:id', deleteInventoryItem)

// Update an item
router.patch('/:id',UpdateinventoryItem)


module.exports = router;
