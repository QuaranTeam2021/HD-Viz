import Papa from 'papaparse';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk0NDQzMjB9.OhXJ3Rhs2I7SW1KzmHEtz9I-Zxpy5KZhDtrOaURpZRQ";

export default class DatabaseLoaderController {

    constructor(store) {
        this.store = store;
        this.port = 5000;
    }

    async getTablesNames() {
        try {
            const response = await fetch(`http://localhost:${this.port}/tables/list`, {
                headers: { "authorization": `Bearer ${token}` }
            });
            const jsonData = await response.json();
            const tables = [];
            jsonData.forEach(e => tables.push(Object.values(e)));
            return tables;
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

    async getSelectedCol(table, selectedFeatures) {
        // array es: ['species','island','sex']
        if (!Array.isArray(selectedFeatures) || typeof table !== "string") {
            console.log({ error: "select table name and features" });
        } 
        const features = selectedFeatures.toString();
        const body = { features };
        try {
            const response = await fetch(`http://localhost:${this.port}/tables/selectedcol/${table}`, {
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                method: "POST"
            });
            const jsonData = await response.json();
            console.log(jsonData);
            let dataString = Papa.unparse(jsonData);
            let result = Papa.parse(dataString, {
                delimiter: ',',
                dynamicTyping: true,
                error(error) {
                    throw new Error(error);
                }
            })
            this.store.loadData(result.data);
        } 
        catch (err) {
            console.error(err.message);
        }
    }

}
