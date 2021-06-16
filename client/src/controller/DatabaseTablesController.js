/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */

export default class DatabaseTablesController {

    constructor() {
        this.port = 5000;
    }

    async getToken() {
        const username = 'HD-Viz QuaranTeam';
        const body = { username };
        try {          
            const response = await fetch(`http://localhost:${this.port}/jwt`, {
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
                method: "POST"
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    async getTablesNames() {
        await this.getToken();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:${this.port}/api/tableslist`, {
                headers: { "authorization": `Bearer ${token}` }
            });
            const jsonData = await response.json();
            let tables = [];
            jsonData.forEach(e => tables.push(Object.values(e)));
            if (tables.length !== 0) tables = tables.flat();
            return tables.length === 0 ? "Il database è vuoto" : tables;
        } catch (err) {
            console.error(err.message);
            err.message = `Si è verificato un errore nella connessione al server`;
            return Promise.reject(err)
        }
    }

    async getTableColumnsNames(table) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:${this.port}/api/getcolnames/${table}`, {
                headers: { "authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                const jsonData = await response.json();
                let columns = [];
                jsonData.forEach(el => columns.push(el.column_name));
                if (columns.length !== 0) columns = columns.flat();
                // console.log(columns)
                return columns.length === 0 ? "La tabella selezionata non contiene colonne" : columns;
            }
            return [];
        } catch (err) {
            console.error(err.message);
            err.message = `Si è verificato un errore nella connessione al server`;
            return Promise.reject(err);
        }
    }
}