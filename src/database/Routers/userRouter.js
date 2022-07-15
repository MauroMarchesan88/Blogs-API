const { Router } = require('express');
const rescue = require('express-rescue');

const userController = require('../controllers/userController.js');
const loginController = require('../controllers/loginController.js');

const router = Router();

router.post('/', rescue(userController.create));

router.use(rescue(loginController.validateToken));

router.get('/', rescue(userController.list));
router.get('/:id', rescue(userController.findById));

module.exports = router;