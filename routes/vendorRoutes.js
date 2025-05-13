const vendorController = require('../controllers/vendorController.js')

const express = require('express')

const router = express.Router()

const path = require('path')

router.post('/register', vendorController.vendorRegister)

router.post('/login', vendorController.vendorLogin)

router.get('/all-vendors', vendorController.getVendors)

router.get('/single-vendor/:id', vendorController.getVendorById)




module.exports = router;