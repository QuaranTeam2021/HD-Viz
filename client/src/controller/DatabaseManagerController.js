/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable consistent-return */

export default class DatabaseManagerController {

    constructor() {
        this.port = 5000;
    }

    async upload(table, file) {
        if (file.size > 0 && file.size < 50000) {
            try {
                const token = localStorage.getItem('token');
                const formData = new FormData();
                formData.append("file", file);
        
                const response = await fetch(`http://localhost:${this.port}/api/upload/${table}`, {
                    body: formData,
                    headers: { "authorization": `Bearer ${token}` },
                    method: "POST"
                });
                const jsonData = await response.json();
                if (response.ok) Promise.resolve(jsonData);
                else Promise.reject(jsonData);
            } catch (err) {
                console.error(err.message);
                Promise.reject(`Si è verificato un errore: ${err.message}`);
            }
        }
    }

    async deleteTable(table) {
        try {
            const token = localStorage.getItem('token');
            const delTable = await fetch(`http://localhost:${this.port}/api/delete/${table}`, { 
                headers: { "authorization": `Bearer ${token}` },
                method: "DELETE"
            });
            const jsonData = await delTable.json();
            if (delTable.ok) Promise.resolve(jsonData);
            else Promise.reject(jsonData);
        } catch (err) {
            console.error(err.message);
            Promise.reject(`Si è verificato un errore: ${err.message}`);
        }
    }
}