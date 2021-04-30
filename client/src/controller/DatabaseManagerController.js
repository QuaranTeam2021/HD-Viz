import Papa from 'papaparse';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk0NDQzMjB9.OhXJ3Rhs2I7SW1KzmHEtz9I-Zxpy5KZhDtrOaURpZRQ";

export default class DatabaseManagerController {

    constructor(store, port) {
        this.store = store;
        this.port = port;
    }

    async getTablesNames() {
        try {
            const response = await fetch(`http://localhost:${this.port}/tables/list`, {
                headers: { "authorization": `Bearer ${token}` }
            });
            const jsonData = await response.json();
            return jsonData;
        } catch (err) {
            return err.message;
        }
    }

    async getTableContent(table) {
        try {
            const response = await fetch(`http://localhost:${this.port}/tables/${table}`, {
                headers: { "authorization": `Bearer ${token}` }
            });
            const jsonData = await response.json();
            let dataString = Papa.unparse(jsonData);
            let result = Papa.parse(dataString, {
                delimiter: ',',
                dynamicTyping: true,
                error(error) {
                    throw new Error(error);
                }
            })
            this.store.loadData(result.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    async getTableColumnsNames(table) {
        try {
            const response = await fetch(`http://localhost:${this.port}/tables/${table}/columnsnames`, {
                headers: { "authorization": `Bearer ${token}` }
            });
            const jsonData = await response.json();
            return jsonData;
        } catch (err) {
            return err.message;
        }
    }

    // features: Array 
    async getSelectedCol(table, features) {
        try {
            const response = await fetch(`http://localhost:${this.port}/tables/selectedcol/${table}`, {
                headers: { "authorization": `Bearer ${token}` }
                // passare array con nomi colonne selezionate
            });
            const jsonData = await response.json();
            let dataString = Papa.unparse(jsonData);
            let result = Papa.parse(dataString, {
                delimiter: ',',
                dynamicTyping: true,
                error(error) {
                    throw new Error(error);
                }
            })
            this.store.loadData(result.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    async deleteTable(table) {
        try {
            const delTable = await fetch(`http://localhost:${this.port}/tables/${table}`, { 
                headers: { "authorization": `Bearer ${token}` },
                method: "DELETE"
            });
            const jsonData = await delTable.json();
            return jsonData;
        } catch (err) {
            return err.message;
        }
    }
}