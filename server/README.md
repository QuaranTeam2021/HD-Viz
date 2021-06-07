# Server

Installazione ed esecuzione opzionale. Database utilizzato: [PostgreSQL](https://www.postgresql.org/).

## Configurazione ed avvio
1. Aprire la cartella server e aprire un terminale posizionato nella cartella server (se non già
aperto);
2. Creare un file `.env` rispettando la notazione presente nel riquadro sottostante. Inserire come valore dei campi `USER`, `PASSWORD` e `DATABASE` rispettivamente il nome utente, la password e il nome del database a cui ci si vuole connettere;
```
HDVIZ_USER = postgres
HDVIZ_PASSWORD = postgres
HDVIZ_HOST = localhost
HDVIZ_PORT = 5432
HDVIZ_DATABASE = hdviz
```
3. Installare le dipendenze con il comando: `npm install`;
4. Avviare il server con il comando: `node server`;

Il server sarà in esecuzione alla porta `5000`.

## Riferimenti

- [PostgreSQL](https://www.postgresql.org/) - Database PostgreSQL
- [Express](https://expressjs.com/it/) - Framework Node.js
- [Node-postgres](https://node-postgres.com/) - Moduli Node.js per interfacciarsi al database PostgreSQL
- [Papaparse](https://www.papaparse.com/) - CSV Parser
- [Multer](https://github.com/expressjs/multer) - Node.js middleware per gestire multipart/form-data
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JSON Web Token sign e verify
- [express-jwt](https://github.com/auth0/express-jwt) - Express middleware per validare JWT
