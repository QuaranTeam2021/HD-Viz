const express = require('express');
const multer = require('multer');
const fs = require('fs');
const client = require('./db');
const papa = require('papaparse');
const upload = multer({ dest: 'tmp/upload/' });
const router = express.Router();

// get tables names
router.get("/tableslist", async (req, res) => {
    try {
        const data = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema='public'
        `);
        res.json(data.rows);
    } 
    catch (err) {
        console.error('tableslist: Server error', err.message);
        res.status(500).json(`Server error: ${err.message}`);
    }
});

// get table columns names
router.get("/getcolnames/:table", async(req, res) => {
    try {
        const { table } = req.params;
        
        if(table == 'undefined' || table === undefined) {
            console.log(`getcolnames: Empty table parameter passed`);
            res.status(400).json(`Empty table parameter passed`);
        }
        else {
            const data = await client.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = '${table}';
            `);
            if(data.rowCount == 0) {
                console.log(`getcolnames: Table ${table} doesn't exist => `, data.rows)
                res.status(404).json(`Table ${table} doesn't exist`);
            } 
            else
                res.json(data.rows);
        }
    } 
    catch (err) {
        console.error('getcolnames: Server error', err.message);
        res.status(500).json(`Server error: ${err.message}`);
    }
});

// get table content
router.get("/getcontent/:table", async(req, res) => {
    try {
        const { table } = req.params;

        if(table == 'undefined' || table === undefined) {
            console.log(`getcontent: Empty table parameter passed`);
            res.status(400).json(`Empty table parameter passed`);
        }
        else {
            const data = await client.query(`
                SELECT * 
                FROM ${table}
            `);
            if(data.rowCount == 0) {
                console.log(`getcontent: table ${table} is empty => `, data.rows)
                res.status(404).json(`Table ${table} is empty`);
            } 
            else
                res.json(data.rows);
        }
    } 
    catch (err) {
        console.error('getcontent: Server error', err.message);
        res.status(500).json(`Server error: ${err.message}`);
    }
});

// get selected columns
router.post("/getselectedcol/:table", async (req, res) => {
    try{
        const { table } = req.params;
        const { features } = req.body;

        if(table == 'undefined' || table === undefined) {
            console.log(`getselectedcol: Empty table parameter passed`);
            res.status(400).json(`Empty table parameter passed`);
        }
        else if(features === undefined) {
            console.log(`getselectedcol: Empty features parameter passed (1)`);
            res.status(400).json(`Empty features parameter passed`);
        }
        else {
            // creazione lista colonne
            const selectedCol = features.split(",");
            let query = ``;
            for (let i in selectedCol)
                if (i) query = query + ` ${selectedCol[i]},`;
            query = query.slice(0, -1);

            if(selectedCol.length === 0 || query.length == 1) {
                console.log(`getselectedcol: Empty features parameter passed (2)`);
                res.status(400).json(`Empty features parameter passed`);
            }
            else {
                const data = await client.query(`
                    SELECT ${query} 
                    FROM ${table}
                `);
                res.json(data.rows);
            }
        }
    }
    catch (err) {
        console.error('getselectedcol: Server error', err.message);
        res.status(500).json(`Server error: ${err.message}`);
    }
});

const createTable = function(header, firstRow, table) {
    let query = '  ';
    for (let i = 0; i < header.length; i++)
        query = query + `${header[i]} ${isNaN(1 * firstRow[i]) ? 'VARCHAR' : 'numeric'}, `;
    query = query.slice(0, -2);
    client.query(`CREATE TABLE ${table} ( ${query} );`);
}

router.post('/upload/:table', upload.single('file'), async (req, res) => {
    try {
        const { table } = req.params;
        
        if (!req.file) {
            console.log(`upload: No file uploaded`);
            res.status(400).json(`No file uploaded`);
        }
        else if (table == 'undefined' || table === undefined) {
            fs.unlinkSync(req.file.path);
            console.log(`upload: Empty table parameter passed`);
            res.status(400).json(`Empty table parameter passed`);
        }
        else { 

            const data = await client.query(`
                SELECT EXISTS (
                    SELECT FROM pg_tables
                    WHERE  schemaname = 'public'
                    AND    tablename  = '${table}'
                );
            `);

            if (data.rows[0].exists) {
                console.log(`upload: table name already exists`)
                res.status(400).json(`Table name already exists`);
            }
            else {
                const file = fs.createReadStream(req.file.path);
                papa.parse(file, {
                    complete: (results) => {   

                        let csvData = results.data;

                        if(csvData === undefined) {
                            console.log(`upload: csvData is undefined`)
                            res.status(500).json(`Undefined content`);
                        }
                        else {

                            const header = csvData[0];
                            const firstRow = csvData[1];

                            createTable(header, firstRow, table);

                            // remove the first line: header
                            csvData.shift();

                            // Creazione query nella forma `INSERT INTO ${table} VALUES ($1, $2, ...);`
                            let param = ' ';
                            for (let j = 1; j <= header.length; j++)
                                param = param + ` $${j},`;
                            param = param.slice(0, -1);

                            csvData.forEach((row) => {
                                client.query(`INSERT INTO ${table} VALUES ( ${param} );`, row, (err) => {
                                    if (err) console.log(err.message);
                                });
                            });

                            console.log(`created table ${table}`);
                            res.json('table created');
                        }
                    }
                }); 
            }
            fs.unlinkSync(req.file.path);         
        }
    }
    catch (err) {
        fs.unlinkSync(req.file.path);
        console.error('upload: Server error: catch', err.message);
        res.status(500).json(`Server error: catch`);
    }
});

// delete table
router.delete("/delete/:table", async (req, res) => {
    try {
        const { table } = req.params;

        if(table == 'undefined' || table === undefined) {
            console.log(`delete: Empty table parameter passed`);
            res.status(400).json(`Empty table parameter passed`);
        }
        else {
            await client.query(`DROP TABLE ${table};`);
            res.json(`The table ${table} was successfully deleted`);
        }
    } 
    catch (err) {
        console.error('delete: ', err.message);
        res.status(404).json(`${err.message}`);
    }
});

module.exports = router;