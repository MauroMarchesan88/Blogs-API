const Joi = require('joi');
const db = require('../models');
const jwtService = require('./jwtService.js');

const usersService = {
    validateBody: (data) => {
        const schema = Joi.object({
            displayName: Joi.string().required().min(8)
                .messages({
                    'string.min': '"displayName" length must be at least 8 characters long',
                }),
            email: Joi.string().email().required()
                .messages({
                    'string.email': '"email" must be a valid email',
                }),
            password: Joi.string().required().min(6)
                .messages({
                    'string.min': '"password" length must be at least 6 characters long',
                }),
            image: Joi.string().required(),
        });

        const { error, value } = schema.validate(data);
        if (error) throw error;

        return value;
    },

    list: async () => {
        const users = await db.User.findAll();
        for (let index = 0; index < users.length; index += 1) {
            delete users[index].dataValues.password;
        }

        return users;
    },

    create: async ({ displayName, email, password, image }) => {
        const uniqueEmail = await db.User.findOne({
            where: { email },
        });

        if (uniqueEmail) {
            const e = new Error('User already registered');
            e.name = 'ConflictError';
            throw e;
        }

        const user = { displayName, email, password, image, token: '' };

        const token = jwtService.createToken(user);
        await db.User.create({ token });
        user.token = token;

        await db.User.create(user);

        return user;
    },

    findById: async (id) => {
        const user = await db.User.findByPk(id, {
            attributes: { exclude: ['password'] },
            where: { id },
        });

        if (!user) {
            const e = new Error('User does not exist');
            e.name = 'NotFoundError';
            throw e;
        }
        return user;
    },
};

module.exports = usersService; 