const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk0NDQzMjB9.OhXJ3Rhs2I7SW1KzmHEtz9I-Zxpy5KZhDtrOaURpZRQ";

export default class DatabaseManagerController {

    constructor() {
        this.port = 5000;
    }

    async upload(table, file) {
        if (file.size > 0 && file.size < 50000) {
            try {
                const formData = new FormData();
                formData.append("uploadedFile", file);
        
                const response = await fetch(`http://localhost:${this.port}/tables/upload/${table}`, {
                    body: formData,
                    headers: { "authorization": `Bearer ${token}` },
                    method: "POST"
                });
                const jsonData = await response.json();
                console.log(jsonData);
            } catch (err) {
                console.error(err.message);
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
}