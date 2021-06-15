const Client = require("pg").Client;
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '.env') });

const connectionString = `postgresql://${process.env.HDVIZ_USER}:${process.env.HDVIZ_PASSWORD}@${process.env.HDVIZ_HOST}:${process.env.HDVIZ_PORT}/${process.env.HDVIZ_DATABASE}`;

const client = new Client({ connectionString });

client
    .connect()
    .then(() => console.log('connected with the DB'))
    .catch(err => console.error('connection error with the DB: ', err.message));

module.exports = client;