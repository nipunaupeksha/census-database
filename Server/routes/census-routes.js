const express = require('express');
const router = express.Router();
const censusController = require('../Controllers/census-controller');

router.get('/getAllStates', censusController.getAllStates);

module.exports = router;