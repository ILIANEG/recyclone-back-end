const express = require('express');
const publicController = require('../controller/publicController')

const router = express.Router();

// Public router allowing query bins in certain radius
router.get('/bins', publicController.getBinsAround);
router.post('/bins', publicController.addBin);

module.exports = router;