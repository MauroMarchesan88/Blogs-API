const { Router } = require('express');
const rescue = require('express-rescue');

const postsController = require('../controllers/postsController');
const loginController = require('../controllers/loginController.js');

const router = Router();

router.use(rescue(loginController.validateToken));

router.post('/', rescue(postsController.create));
router.get('/', rescue(postsController.list));
router.get('/:id', rescue(postsController.findById));
router.put('/:id', rescue(postsController.update));
router.delete('/:id', rescue(postsController.delete));

module.exports = router;