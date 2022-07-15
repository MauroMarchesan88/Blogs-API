const express = require('express');
const loginRouter = require('./database/Routers/loginRouter');
const userRouter = require('./database/Routers/userRouter.js');
// ...

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);

app.use((err, _req, res, _next) => {
    const { name, message } = err;
    switch (name) {
        case 'ValidationError':
            res.status(400).json({ message });
            break;
        case 'NotFoundError':
            res.status(404).json({ message });
            break;
        case 'ConflictError':
            res.status(409).json({ message });
            break;
        case 'UnauthorizedError':
            res.status(401).json({ message });
            break;
        default:
            res.status(500).json({ message });
            break;
    }
});

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
