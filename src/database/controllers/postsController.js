const postsService = require('../services/postsService');
const loginService = require('../services/loginService.js');

const postsController = {
    list: async (req, res) => {
        const { authorization } = req.headers;
        const { id } = await loginService.validateToken(authorization);

        const posts = await postsService.list(id);
        res.status(200).json(posts);
    },

    create: async (req, res) => {
        const { title, content, categoryIds } = req.body;
        const { authorization } = req.headers;

        await postsService.validateBody(req.body);
        const { id } = await loginService.validateToken(authorization);

        const post = await postsService.create(title, content, categoryIds, id);

        res.status(201).json(post);
    },

    findById: async (req, res) => {
        const post = await postsService.findById(req.params.id);

        res.status(200).json(post);
    },
};

module.exports = postsController; 