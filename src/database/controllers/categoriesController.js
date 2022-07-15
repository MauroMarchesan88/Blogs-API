const categoriesService = require('../services/categoriesService.js');

const categoriesController = {
    // list: async (_req, res) => {
    //     const categories = await categoriesService.list();
    //     res.status(200).json(categories);
    // },

    create: async (req, res) => {
        const { name } = req.body;
        await categoriesService.validateBody(req.body);

        const category = await categoriesService.create(name);

        res.status(201).json(category);
    },

    // findById: async (req, res) => {
    //     const category = await categoriesService.findById(req.params.id);

    //     res.status(200).json(category);
    // },
};

module.exports = categoriesController; 