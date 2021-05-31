const Client = require("pg").Client;
require("dotenv").config();

const connectionString = `postgresql://${process.env.HDVIZ_USER}:${process.env.HDVIZ_PASSWORD}@${process.env.HDVIZ_HOST}:${process.env.HDVIZ_PORT}/${process.env.HDVIZ_DATABASE}`;

const client = new Client({ connectionString });

client
    .connect()
    .then(() => console.log('connected with the DB'))
    .catch(err => console.error('connection error with the DB:', err.message));

/*   CHIUDERE LA CONNESSIONE
client
    .end()
    .then(() => console.log('client has disconnected'))
    .catch(err => console.error('error during disconnection', err.stack))
*/

module.exports = client;