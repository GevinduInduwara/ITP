const express = require('express')

const {
    createRepair,
    getRepairs,
    getRepair,
    deleteRepair,
    updateRepair
} = require('../controllers/repairController')


const router = express.Router()

//GET all repairs
router.get('/', getRepairs)

//GET a single repairs
router.get('/edit/:id', getRepair)

//POST a new repairs
router.post('/add', createRepair)

//DELETE a repairs
router.delete('/:id', deleteRepair)

//UPDATE a repairs
router.patch('/:id', updateRepair)

module.exports = router 