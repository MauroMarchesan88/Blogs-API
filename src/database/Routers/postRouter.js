const { Router } = require('express');
const rescue = require('express-rescue');

const postsController = require('../controllers/postsController');
const loginController = require('../controllers/loginController.js');

const router = Router();

router.use(rescue(loginController.validateToken));

router.post('/', rescue(postsController.create));
// router.get('/', rescue(postsController.create));
// router.get('/:id', rescue(postsController.findById));

module.exports = router;