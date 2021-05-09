const express = require('express');
const fs = require("fs");
const fastcsv = require("fast-csv");
const router = express.Router();
const client = require("./db");

// get tables names
router.get("/tableslist", async(req, res) => {
    try {
        const data = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`);
        res.json(data.rows);
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error: access to data denied');
    }
});

// get table columns names
router.get("/getcolnames/:table", async(req, res) => {
    try {
        const { table } = req.params;
        const data = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${table}';`);
        res.json(data.rows);
    } 
    catch (err) {
        console.error(err.message);
        res.status(404).send('Server error: selected table doesn\'t exist');
    }
});

// get table content
router.get("/getcontent/:table", async(req, res) => {
    try {
        const { table } = req.params;
        const data = await client.query(`SELECT * FROM ${table}`);
        res.json(data.rows);
    } 
    catch (err) {
        console.error(err.message);
        res.status(404).send('Server error: selected table doesn\'t exist');
    }
});

// get selected columns
router.post("/getselectedcol/:table", async (req, res) => {
    try{
        const { table } = req.params;
        const { features } = req.body;

        const selectedCol = features.split(",");

        // creazione lista colonne
        var query = ``;
        for (var i in selectedCol) {
            if (i) 
                query = query + ` ${selectedCol[i]},`;
        }

        query = query.slice(0, -1);

        if(!table) {
            res.status(400).send({ msg: 'select table name' });
        }
        else if(selectedCol.length === 0) {
            res.status(400).send({ msg: 'select some columns' });
        }
        else {
            const data = await client.query(`SELECT ${query} FROM ${table}`);
            res.json(data.rows);
        }
    }
    catch(err) {
        console.error(err.message);
        res.status(404).send('Server error');
    }
});

// upload a csv (and create the table)
router.post('/upload/:table', (req, res) => {
// router.post('/upload/:table', async (req, res) => {
    try {
        const { table } = req.params;

        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } 
        else {
            // Use the name of the input field to retrieve the uploaded file
            let uploadedFile = req.files.uploadedFile;
            
            // Use the mv() method to place the file in uploads directory
            uploadedFile.mv('./uploads/' + uploadedFile.name);

            let stream = fs.createReadStream(`uploads/${uploadedFile.name}`);
            let csvData = [];
            let csvStream = fastcsv
                .parse()
                .on("data", function parseData(data) {
                    csvData.push(data);
                })
                .on("end", function saveInTheDB() {

                    // header e prima riga
                    const header = csvData[0];
                    const firstRow = csvData[1];
                    console.log(header);
                    console.log(firstRow);

                    var type = function(el) {
                        if(isNaN(1 * el))
                            return "VARCHAR";
                        return "numeric";
                    }

                    // Creo mappa (nome_colonna, tipo)
                    var columns = new Map();
                    for (var i = 0; i < header.length; i++) {
                        columns.set(header[i], type(firstRow[i]));
                    }
                    console.log(columns);
    
                    var query = '  ';
                    for (var [key, value] of columns) {
                        query = query + `${key} ${value}, `;
                    }
                    query = query.slice(0, -2);
    
                    // CREAZIONE TABELLA (Rimosso await)
                    const data = client.query(`CREATE TABLE ${table} ( ${query} );`);
                    console.log(data);

                    // remove the first line: header
                    csvData.shift();
                
                    // Creazione query nella forma `INSERT INTO ${table} VALUES ($1, $2, ...);`
                    var param = `INSERT INTO ${table} VALUES (`;
                    for (var j = 1; j <= header.length; j++) {
                        param = param + ` $${j},`;
                    }
                    param = param.slice(0, -1);
                    param = param + `);`;
                    console.log(param);

                    try {
                        csvData.forEach((row) => {
                            // rimosso res da sotto
                            client.query(param, row, (err) => {
                                if (err)
                                    console.log(err.stack);
                            });
                        });
                    } 
                    catch (err) {
                        res.status(500).send(err);
                    }
                });
            
            stream.pipe(csvStream);

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: uploadedFile.name,
                    mimetype: uploadedFile.mimetype,
                    size: uploadedFile.size
                },
                table: 'Successfully created'
            });
        }
    } 
    catch (err) {
        res.status(500).send(err);
    }
});

// delete table
router.delete("/delete/:table", async (req, res) => {
    try {
        const { table } = req.params;
        await client.query(`DROP TABLE ${table};`);
        res.json(`The table ${table} was successfully deleted`);
    } 
    catch (err) {
        console.error(err.message);
        res.status(404).send('Server error: selected table doesnt exist');
    }
});

module.exports = router;