const { Router } = require('express');
const rescue = require('express-rescue');

const postsController = require('../controllers/postsController');
const loginController = require('../controllers/loginController.js');

const router = Router();

router.use(rescue(loginController.validateToken));

router.put('/:id', rescue(postsController.update));
router.delete('/:id', rescue(postsController.delete));
router.post('/', rescue(postsController.create));
router.get('/search', rescue(postsController.findByQuery));
router.get('/:id', rescue(postsController.findById));
router.get('/', rescue(postsController.list));

module.exports = router;