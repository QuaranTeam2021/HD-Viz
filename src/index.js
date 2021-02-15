const express = require("express");
const expFileUplaod = require('express-fileupload');
const DR = require('./dr');
const fs = require('fs');
const path = require('path');

var app = express();
const router = express.Router();
const port = 5000;
const rootPath = path.join(__dirname, '..', 'public');

// Pagina iniziale
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: rootPath });
});

// Cercare di accedere normalmente alla pagina del grafico ritorna alla scelta dei dati
router.get('/graph', (req, res) => {
    res.redirect('/');
});

// Save data from post form
router.post('/graph', function (req, res, next) {
    // Permette di caricare un file arbitrario senza dover sceglierlo ogni volta
    if (req.body.bypass == "on") { 
        fs.readFile(path.join(__dirname, '../data_test', 'iris.csv'), 'utf8', (err, data) => {
            if (err) console.error(err);
            req.files = new Object();
            req.files.data_file = data;
            next();
        });
    }
    else if (req.files === null || req.files === undefined) return res.sendStatus(400);
        
    // per ora salva il file in una cartella, possibile anche non salvando il file
    else if (req.files.data_file) { 
        let data_file = req.files.data_file;
        if(req.body.bypass !== "on") {
            data_file.mv(path.join(__dirname, '../data_test', data_file.name), (err) => {
                if (err) {
                    console.error(err);
                    return res.sendStatus(500);
                }
                console.log(`Saved ${data_file.name}`);
            });
            req.files.data_file = data_file.toString();
            next();
        }
    }
    else {
        console.log("data_file undefined");
        res.send("Ayo bruv something's wrong with the file");
    }
}, dimRed, showData);

app.use('/', express.json());
app.use('/', express.urlencoded({ extended: false }));
app.use(expFileUplaod());
app.use('/', router);

app.listen(port, () => {
    console.log("App started");
});


// Riduzione dimensionale
function dimRed(req, res, next) {
    let data = req.files.data_file;
    // Conversione string => float
    data = data.split("\n");
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split(',').map(x => +x);
    }
    data = DR.PCA(data, 2);
    req.data = data;

    next();
}

// Carica pagina
function showData(req, res) {
    let data = req.data;
    // Ritorna la pagina graph.html aggiungendo il grafico
    res.writeHead(200, { "Content-Type": 'text/html' });
    res.end(data.toString());
}