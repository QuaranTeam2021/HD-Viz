import Papa from 'papaparse';

const token = "";

export default class DatabaseLoaderController {

    constructor(store) {
        this.store = store;
        this.port = 5000;
    }

    async loadTable(table) {
        try {
            const response = await fetch(`http://localhost:${this.port}/api/getcontent/${table}`, {
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

    async loadTableCols(table, selectedFeatures) {
        // array es: ['species','island','sex']
        if (!Array.isArray(selectedFeatures) || typeof table !== "string") {
            console.log({ error: "select table name and features" });
        } 
        const features = selectedFeatures.toString();
        const body = { features };
        try {
            const response = await fetch(`http://localhost:${this.port}/api/getselectedcol/${table}`, {
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
