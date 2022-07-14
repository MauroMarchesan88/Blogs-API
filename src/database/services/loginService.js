const Joi = require('joi');
const db = require('../models');
const jwtService = require('./jwtService');

const loginService = {
    validateBody: (data) => {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required()
                .messages({
                    'string.empty': 'Some required fields are missing',
                }),
            password: Joi.string()
                .required()
                .min(6)
                .messages({
                    'string.empty': 'Some required fields are missing',
                }),
        });

        const { error, value } = schema.validate(data);
        console.log(error);

        if (error) throw error;

        return value;
    },

    login: async (email, password) => {
        const user = await db.User.findOne({
            where: { email },
        });
        console.log(user, 'user');

        if (!user || user.password !== password) {
            const error = new Error('Invalid fields');
            error.name = 'UnauthorizedError';
            throw error;
        }

        const { passwordHash, ...userWithoutPassword } = user.dataValues;

        const token = jwtService.createToken(userWithoutPassword);

        return token;
    },

    // validateToken: (token) => {
    //     const data = jwtService.validateToken(token);

    //     return data;
    // },
};

module.exports = loginService; 