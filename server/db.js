const Client = require("pg").Client;

const client = new Client({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "hdviz",
});

client
    .connect()
    .then(() => console.log('connected with the DB'))
    .catch(err => console.error('connection error with the DB', err.stack));

/*
CHIUDERE LA CONNESSIONE
client
    .end()
    .then(() => console.log('client has disconnected'))
    .catch(err => console.error('error during disconnection', err.stack))
*/

module.exports = client;