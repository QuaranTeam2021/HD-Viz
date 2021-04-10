const express = require("express");
const cors = require("cors");
const router = require("./route");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use('', router);

app.listen(
    PORT,
    () => console.log(`server alive on http://localhost:${PORT}`)
);
