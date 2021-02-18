const express = require("express");
const expFileUplaod = require('express-fileupload');
const dr = require('./dr');
const fs = require('fs');
const path = require('path');
const scatterplot = require('./scatterplot');
const scpMatrix = require('./scpMatrix')

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
        fs.readFile(path.join(__dirname, '../data_test', 'iris_dataset.csv'), 'utf8', (err, data) => {
            if (err) console.error(err);
            req.files = new Object();
            req.files.data_file = data;
            req.body.grafico = 'scpm';
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
            req.files.data_file = data_file.data.toString('utf8');
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
    let temp = [];
    const colNumber = data[0].split(',').length - 1; // solo per iris
    for (let i = 1; i < data.length; i++) {
        data[i] = data[i].split(',');
        temp[i] = data[i][colNumber]; // solo per iris
        data[i] = data[i].map(x => +x);
    }
    if(req.body.grafico !== 'scpm')
        data = dr.PCA(data, 2);
    // solo per iris
    for(let i = 1; i < data.length; i++) {
        data[i][colNumber] = temp[i];
    }
    req.columns = data[0];
    data[0] = req.columns.split(',');
    req.data = data;

    next();
}

// Carica pagina
function showData(req, res) {
    let data = req.data;
    let columns = req.columns;
    let graph_type = req.body.grafico;
    // Ritorna la pagina graph.html aggiungendo il grafico
    res.writeHead(200, { "Content-Type": 'text/html' });
    if (graph_type === "scp")
        res.end(scatterplot(data));
    else
        res.end(scpMatrix(data, columns));
}