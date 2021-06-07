const cors = require("cors");
const express = require("express");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const router = require("./route");

const app = express();
const PORT = 5000;
const jwtSecret = 'multidimensional';

// middleware
app.use(cors());
app.use(express.json());

app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({ path: ['/jwt'] }));

app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        console.error(err.message);
        return res.status(err.status).send({ message: err.message });
    }
    next();
});

app.post('/jwt', (req, res) => {
    const username = req.body.username;
    if (username !== 'HD-Viz QuaranTeam')
        res.status(403).send('Unauthorized user');
    else {
        const user = { name: username };
        res.json({ token: jsonwebtoken.sign(user, jwtSecret, { expiresIn: '30m' }) });
    }
});

app.use('/api', router);

app.listen(
    PORT,
    () => console.log(`server alive on http://localhost:${PORT}`)
);
