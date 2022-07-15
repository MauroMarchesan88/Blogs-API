const loginService = require('../services/loginService.js');

const loginController = {
    login: async (req, res) => {
        const { email, password } = loginService.validateBody(req.body);

        const token = await loginService.login(email, password);

        res.status(200).json({ token });
    },

    validateToken: (req, _res, next) => {
        const { authorization } = req.headers;

        if (!authorization) {
            const error = new Error('Token not found');
            error.name = 'UnauthorizedError';
            throw error;
        }
        loginService.validateToken(authorization);

        next();
    },
};

module.exports = loginController; 