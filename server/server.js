const cors = require("cors");
const express = require("express");
const fileUpload = require('express-fileupload');
const jwt = require("jsonwebtoken");
const router = require("./route");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

// app.use('/tables', authenticateToken, router);
app.use('/tables', router);

app.post('/login', (req, res) => {
    // Authentication Mock User

    const username = req.body.username;
    const user = { name: username };

    console.log(user);
    const accessToken = jwt.sign(user, "secret");
    res.json({ accessToken })
});

/*
function authenticateToken(req, res, next) {
    // Bearer TOKEN
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "secret", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
*/

app.listen(
    PORT,
    () => console.log(`server alive on http://localhost:${PORT}`)
);
