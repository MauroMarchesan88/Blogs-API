const usersService = require('../services/usersService.js');
const loginService = require('../services/loginService.js');

const usersController = {
    list: async (_req, res) => {
        const users = await usersService.list();
        res.status(200).json(users);
    },

    create: async (req, res) => {
        const { displayName, email, password, image } = await usersService.validateBody(req.body);

        const user = await usersService.create({ displayName, email, password, image });

        res.status(201).json(user);
    },

    findById: async (req, res) => {
        const user = await usersService.findById(req.params.id);

        res.status(200).json(user);
    },

    delete: async (req, res) => {
        const { authorization } = req.headers;
        const { id } = await loginService.validateToken(authorization);
        await usersService.findById(id);

        await usersService.destroy(id);

        res.sendStatus(204);
    },
};

module.exports = usersController; 