const Joi = require('joi');
const Sequelize = require('sequelize');
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

    list: async (id) => {
        const posts = await db.BlogPost.findAll({
            where: { userId: { [Sequelize.Op.like]: id } },
            include: [
                { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
                {
                    model: db.Category,
                    as: 'categories',
                },
            ],
        });

        return posts;
    },

    create: async (title, content, categoryIds, id) => {
        const { count } = await db.Category.findAndCountAll({
            where: { id: { [Sequelize.Op.like]: categoryIds[1] } },
        });

        if (!count) {
            const e = new Error('"categoryIds" not found');
            e.name = 'ValidationError';
            throw e;
        }

        const newPost = await db.BlogPost.create(
            { title, content, userId: id },
        );

        await db.PostCategory.bulkCreate([
            { postId: newPost.id, categoryId: categoryIds[0] },
            { postId: newPost.id, categoryId: categoryIds[1] },
        ]);

        return newPost;
    },

    findById: async (id) => {
        const post = await db.BlogPost.findByPk(id, {
            where: { id },
            include: [
                { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
                {
                    model: db.Category,
                    as: 'categories',
                },
            ],
        });

        if (!post) {
            const e = new Error('Post does not exist');
            e.name = 'NotFoundError';
            throw e;
        }
        return post;
    },

    update: async (title, content, id) => {
        const targetPost = await db.BlogPost.findOne({
            where: { title },
        });

        if (id !== targetPost.userId) {
            const e = new Error('Unauthorized user');
            e.name = 'UnauthorizedError';
            throw e;
        }

        const newPost = await db.BlogPost.update(
            { content },
            { where: { title } },
        );

        return newPost;
    },
};

module.exports = categoriesService; 