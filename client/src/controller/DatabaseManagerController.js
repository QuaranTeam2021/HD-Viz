/* eslint-disable consistent-return */
const token = "";

export default class DatabaseManagerController {

    constructor() {
        this.port = 5000;
    }

    async upload(table, file) {
        if (file.size > 0 && file.size < 50000) {
            try {
                const formData = new FormData();
                formData.append("file", file);
        
                const response = await fetch(`http://localhost:${this.port}/api/upload/${table}`, {
                    body: formData,
                    headers: { "authorization": `Bearer ${token}` },
                    method: "POST"
                });
                const jsonData = await response.json();
                return jsonData;
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    async deleteTable(table) {
        try {
            const delTable = await fetch(`http://localhost:${this.port}/api/delete/${table}`, { 
                headers: { "authorization": `Bearer ${token}` },
                method: "DELETE"
            });
            const jsonData = await delTable.json();
            return jsonData;
        } catch (err) {
            console.error(err.message);
        }
    }
}