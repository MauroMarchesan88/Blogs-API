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

    // findById: async (id) => {
    //     const user = await db.User.findByPk(id, {
    //         attributes: { exclude: ['password'] },
    //         where: { id },
    //     });

    //     if (!user) {
    //         const e = new Error('User does not exist');
    //         e.name = 'NotFoundError';
    //         throw e;
    //     }
    //     return user;
    // },
};

module.exports = categoriesService; 