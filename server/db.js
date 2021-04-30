const Client = require("pg").Client;
require("dotenv").config();

const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`;

const client = new Client({ connectionString });

client
    .connect()
    .then(() => console.log('connected with the DB'))
    .catch(err => console.error('connection error with the DB', err.stack));

/*   CHIUDERE LA CONNESSIONE
client
    .end()
    .then(() => console.log('client has disconnected'))
    .catch(err => console.error('error during disconnection', err.stack))
*/

module.exports = client;