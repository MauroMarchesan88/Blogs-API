const Joi = require('joi');
const db = require('../models');
const jwtService = require('./jwtService.js');

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

        if (error) throw error;

        return value;
    },

    login: async (email, passwrd) => {
        const user = await db.User.findOne({
            where: { email },
        });

        if (!user || user.password !== passwrd) {
            const error = new Error('Invalid fields');
            error.name = 'ValidationError';
            throw error;
        }

        const { password, ...userWithoutPassword } = user.dataValues;

        const token = jwtService.createToken(userWithoutPassword);
        return token;
    },

    validateToken: (token) => {
        const data = jwtService.validateToken(token);
        return data;
    },
};

module.exports = loginService; 