const loginService = require('../services/loginService.js');
// const jwtService = require('../services/jwtService.js');

const loginController = {
    login: async (req, res) => {
        const { email, password } = loginService.validateBody(req.body);

        const token = await loginService.login(email, password);

        res.status(200).json({ token });
    },

    // validateToken: (req, _res, next) => {
    //     const { login } = req.headers;

    //     jwtService.validateToken(login);

    //     next();
    // },
};

module.exports = loginController; 