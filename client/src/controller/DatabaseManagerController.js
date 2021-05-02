const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk0NDQzMjB9.OhXJ3Rhs2I7SW1KzmHEtz9I-Zxpy5KZhDtrOaURpZRQ";

export default class DatabaseManagerController {

    constructor() {
        this.port = 5000;
    }

    // da sistemare
    async upload(table, file) {
        console.log("upload")
        console.log(table)
        console.log(file)
        if (file.size > 0 && file.size < 50000) {
            try {
                const response = await fetch(`http://localhost:${this.port}/tables/${table}`, {
                    body: file,
                    headers: { "authorization": `Bearer ${token}` },
                    method: "POST"
                });
                const jsonData = await response.json();
                console.log(jsonData);
            } catch (err) {
                console.log(err.message);
            }
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

    async getTablesNames() {
        try {
            const response = await fetch(`http://localhost:${this.port}/tables/list`, {
                headers: { "authorization": `Bearer ${token}` }
            });
            const jsonData = await response.json();
            const tables = [];
            jsonData.forEach(e => tables.push(Object.values(e)));
            console.log(tables)
            return tables;
        } catch (err) {
            return err.message;
        }
    }
}