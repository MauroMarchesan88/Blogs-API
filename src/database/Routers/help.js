const { Router } = require('express');
const rescue = require('express-rescue');

const helpController = require('../controllers/helpController.js');

const router = Router();

router.get('/', rescue(helpController.list));

module.exports = router;