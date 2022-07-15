const Joi = require('joi');
const db = require('../models');

const categoriesService = {
    validateBody: (body) => {
        const schema = Joi.object({
            title: Joi.string().required()
                .messages({
                    'string.empty': 'Some required fields are missing',
                }),
            content: Joi.string().required()
                .messages({
                    'string.empty': 'Some required fields are missing',
                }),
            categoryIds: Joi.array().required(),
        });

        const { error, value } = schema.validate(body);
        if (error) throw error;

        return value;
    },

    // list: async () => {
    //     const categories = await db.Category.findAll();

    //     return categories;
    // },

    create: async (title, content, categoryIds) => {
        const newPost = await db.BlogPost.create(
            { title, content, postId: categoryIds[0], categoryId: categoryIds[1] },
        );

        console.log(newPost, 'newPost');

        return newPost;
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