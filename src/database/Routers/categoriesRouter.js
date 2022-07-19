const { Router } = require('express');
const rescue = require('express-rescue');

const categoriesController = require('../controllers/categoriesController.js');
const loginController = require('../controllers/loginController.js');

const router = Router();

router.use(rescue(loginController.validateToken));
router.post('/', rescue(categoriesController.create));

router.get('/', rescue(categoriesController.list));

module.exports = router;