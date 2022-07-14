const { Router } = require('express');
const rescue = require('express-rescue');

const loginController = require('../controllers/loginController');

const router = Router();

router.post('/', rescue(loginController.login));

module.exports = router;