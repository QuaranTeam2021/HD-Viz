
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
            return tables;
        } catch (err) {
            console.error(err.message);
            return [];
        }
    }

    async getTableColumnsNames(table) {
        try {
            const token = localStorage.getItem('token');
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
            console.error(err.message);
            return [];
        }
    }
}