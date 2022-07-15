const db = require('../models');

const helpController = {
    list: async (_req, res) => {
        const categories = await db.PostCategory.findAll();

        res.status(200).json(categories);
    },
};

module.exports = helpController; 