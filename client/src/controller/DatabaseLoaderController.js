const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk0NDQzMjB9.OhXJ3Rhs2I7SW1KzmHEtz9I-Zxpy5KZhDtrOaURpZRQ";

export default class DatabaseLoaderController {

    constructor(port) {
        this.port = port;
    }

    // da sistemare
    async upload(table, file) {
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
}