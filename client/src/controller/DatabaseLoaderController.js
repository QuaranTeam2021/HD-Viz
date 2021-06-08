/* eslint-disable prefer-promise-reject-errors */
import Papa from 'papaparse';


export default class DatabaseLoaderController {

    constructor(store) {
        this.store = store;
        this.port = 5000;
    }

    async loadTable(table) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:${this.port}/api/getcontent/${table}`, {
                headers: { "authorization": `Bearer ${token}` }
            });
            const jsonData = await response.json();
            let dataString = Papa.unparse(jsonData);
            let result = Papa.parse(dataString, {
                dynamicTyping: true,
                error(error) {
                    console.error(error.message);
                }
            })
            if (result.data.length === 0) return Promise.reject('La tabella selezionata non contiene dati');
            if (result.data.length > 2000) return Promise.reject('La tabella selezionata è troppo grande');
            this.store.loadData(result.data);
            return Promise.resolve('Il caricamento è terminato con successo');
        } catch (err) {
            console.error(err.message);
            return Promise.reject(`Si è verificato un errore: ${err.message}`);
        }
    }

    async loadTableCols(table, selectedFeatures) {
        // array es: ['species','island','sex']
        if (!Array.isArray(selectedFeatures) || typeof table !== "string") {
            console.error({ error: "select table name and features" });
        } 
        const features = selectedFeatures.toString();
        const body = { features };
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:${this.port}/api/getselectedcol/${table}`, {
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                method: "POST"
            });
            const jsonData = await response.json();
            let dataString = Papa.unparse(jsonData);
            let result = Papa.parse(dataString, {
                dynamicTyping: true,
                error(error) {
                    console.error(error.message);
                }
            })
            if (result.data.length === 0) return Promise.reject('La tabella selezionata non contiene dati');
            if (result.data.length > 2000) return Promise.reject('La tabella selezionata è troppo grande');
            this.store.loadData(result.data);
            return Promise.resolve('Il caricamento è terminato con successo');
        } 
        catch (err) {
            console.error(err.message);
            return Promise.reject(`Si è verificato un errore: ${err.message}`);
        }
    }

}
