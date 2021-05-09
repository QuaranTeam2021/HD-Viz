const token = "";

export default class DatabaseTablesController {

    constructor() {
        this.port = 5000;
    }

    async getTablesNames() {
        try {
            const response = await fetch(`http://localhost:${this.port}/api/tableslist`, {
                headers: { "authorization": `Bearer ${token}` }
            });
            const jsonData = await response.json();
            let tables = [];
            jsonData.forEach(e => tables.push(Object.values(e)));
            if (tables.length !== 0) tables = tables.flat();
            return tables;
        } catch (err) {
            console.log(err.message);
            return [];
        }
    }

    async getTableColumnsNames(table) {
        try {
            const response = await fetch(`http://localhost:${this.port}/api/getcolnames/${table}`, {
                headers: { "authorization": `Bearer ${token}` }
            });

            console.log("STATUS: ", response.status, " ESITO: ", response.ok)

            if (response.ok) {
                const jsonData = await response.json();
                let columns = [];
                jsonData.forEach(el => columns.push(el.column_name));
                if (columns.length !== 0) columns = columns.flat();
                console.log(columns)
                return columns;
            }
            return [];

        } catch (err) {
            console.log(err.message);
            return [];
        }
    }
}