const Joi = require('joi');
const db = require('../models');

const categoriesService = {
    validateBody: (body) => {
        const schema = Joi.object({
            name: Joi.string().required(),
        });

        const { error, value } = schema.validate(body);
        if (error) throw error;

        return value;
    },

    list: async () => {
        const categories = await db.Category.findAll();

        return categories;
    },

    create: async (name) => {
        const newCategory = await db.Category.create({ name });
        const { id } = newCategory.dataValues;

        const uniqueCategory = await db.Category.findOne({
            where: { id },
        });

        return uniqueCategory;
    },
};

module.exports = categoriesService; 