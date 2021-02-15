const express = require('express');
const publicController = require('../controller/publicController')
const publicValidator = require('../validator/publicValidator')

const router = express.Router();

// Public router allowing query bins in certain radius
router.get('/bins', publicValidator.findBinValidator, publicController.getBinsAround);
router.post('/bins', publicValidator.addBinValidator, publicController.addBin);

module.exports = router;