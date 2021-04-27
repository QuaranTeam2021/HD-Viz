const cors = require("cors");
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = require("./route");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use('/tables', authenticateToken, router);

app.post('/login', (req, res) => {
    // Authentication Mock User

    const username = req.body.username;
    const user = { name: username };

    console.log(user);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken })
});

function authenticateToken(req, res, next) {
    // Bearer TOKEN
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(
    PORT,
    () => console.log(`server alive on http://localhost:${PORT}`)
);
