const postsService = require('../services/postsService');

const postsController = {
    // list: async (_req, res) => {
    //     const posts = await postsService.list();
    //     res.status(200).json(posts);
    // },

    create: async (req, res) => {
        const { title, content, categoryIds } = req.body;
        await postsService.validateBody(req.body);

        const post = await postsService.create(title, content, categoryIds);

        res.status(201).json(post);
    },

    // findById: async (req, res) => {
    //     const category = await postsService.findById(req.params.id);

    //     res.status(200).json(category);
    // },
};

module.exports = postsController; 