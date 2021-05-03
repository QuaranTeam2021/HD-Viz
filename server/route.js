const express = require('express');
const fs = require("fs");
const fastcsv = require("fast-csv");
const router = express.Router();
const client = require("./db");

// get tables names
router.get("/list", async(req, res) => {
    try {
        const data = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`);
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error: access to data denied');
    }
});

// get table columns names
router.get("/:table/columnsnames", async(req, res) => {
    try {
        const { table } = req.params;
        const data = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${table}';`);
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Server error: selected table doesn\'t exist');
    }
});

// get table content
router.get("/:table", async(req, res) => {
    try {
        const { table } = req.params;
        const data = await client.query(`SELECT * FROM ${table}`);
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Server error: selected table doesn\'t exist');
    }
});

// get selected columns
router.post("/selectedcol/:table", async (req, res) => {
    try{
        const { table } = req.params;
        const { features } = req.body;

        const selectedCol = features.split(",");

        // creazione lista colonne
        var query = ``;
        for (i in selectedCol) {
            query = query + ` ${selectedCol[i]},`;
        }
        query = query.slice(0, -1);

        if(!table) {
            res.status(400).send({msg:'select table name'});
        }
        else if(selectedCol.length === 0) {
            res.status(400).send({msg:'select some columns'});
        }
        else{
            const data = await client.query(`SELECT ${query} FROM ${table}`);
            res.json(data.rows);
        }
    }catch(err) {
        console.error(err.message);
        res.status(404).send('Server error');
    }
});

// upload a csv (and create the table)
router.post('/upload/:table', async (req, res) => {
    try {
        const { table } = req.params;

        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            // Use the name of the input field to retrieve the uploaded file
            let uploadedFile = req.files.uploadedFile;
            
            // Use the mv() method to place the file in uploads directory
            uploadedFile.mv('./uploads/' + uploadedFile.name);

            let stream = fs.createReadStream(`uploads/${uploadedFile.name}`);
            let csvData = [];
            let csvStream = fastcsv
                .parse()
                .on("data", function(data) {
                    csvData.push(data);
                })
                .on("end", function() {

                    // header e prima riga
                    const header = csvData[0];
                    const firstRow = csvData[1];
                    console.log(header);
                    console.log(firstRow);

                    function type(el) {
                        if(isNaN(1 * el))
                            return "VARCHAR";
                        else 
                            return "numeric";
                    }

                    // Creo mappa (nome_colonna, tipo)
                    var columns = new Map();
                    for (i = 0; i < header.length; i++) {
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

                    // remove the first line: header
                    csvData.shift();
                
                    // Creazione query nella forma `INSERT INTO ${table} VALUES ($1, $2, ...);`
                    var param = `INSERT INTO ${table} VALUES (`;
                    for (i = 1; i <= header.length; i++) {
                        param = param + ` $${i},`;
                    }
                    param = param.slice(0, -1);
                    param = param + `);`;
                    console.log(param);

                    try {
                        csvData.forEach(row => {
                            client.query(param, row, (err, res) => {
                                if (err)
                                    console.log(err.stack);
                                // else
                                //    console.log("inserted " + res.rowCount + " row:", row);
                            });
                        });
                    } catch (err) {
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
    } catch (err) {
        res.status(500).send(err);
    }
});

// delete table
router.delete("/:table", async (req, res) => {
    try {
        const { table } = req.params;
        await client.query( `DROP TABLE ${table};` );
        res.json(`The table ${table} was successfully deleted`);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Server error: selected table doesnt exist');
    }
});

module.exports = router;