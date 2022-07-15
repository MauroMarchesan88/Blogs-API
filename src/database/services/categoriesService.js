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

    // list: async () => {
    //     const users = await db.User.findAll();
    //     for (let index = 0; index < users.length; index += 1) {
    //         delete users[index].dataValues.password;
    //     }

    //     return users;
    // },

    create: async (name) => {
        console.log(name, 'name');
        const newCategory = await db.Category.create({ name });
        const { id } = newCategory.dataValues;
        const uniqueCategory = await db.Category.findOne({
            where: { id },
        });

        console.log(uniqueCategory, 'unique');

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