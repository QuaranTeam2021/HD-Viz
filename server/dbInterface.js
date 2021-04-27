const PORT = 5000;

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk0NDQzMjB9.OhXJ3Rhs2I7SW1KzmHEtz9I-Zxpy5KZhDtrOaURpZRQ";

const getToken = async () => {
    try {
        const username = "tmp";
        const response = await fetch(`http://localhost:${PORT}/login`, {
            method: "POST",
            body: JSON.stringify(username)
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        console.error(err.message);
    }
};

const getTablesNames = async () => {
    try {
        const response = await fetch(`http://localhost:${PORT}/tables/list`, {
            headers: { "authorization": `Bearer ${token}` }
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        console.error(err.message);
    }
};

const getTableContent = async (table) => {
    try {
        const response = await fetch(`http://localhost:${PORT}/tables/${table}`, {
            headers: { "authorization": `Bearer ${token}` }
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        console.error(err.message);
    }
};

const getTableColumnsNames = async (table) => {
    try {
        const response = await fetch(`http://localhost:${PORT}/tables/${table}/columnsnames`, {
            headers: { "authorization": `Bearer ${token}` }
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        console.error(err.message);
    }
};

const deleteTable = async (table) => {
    try {
        const deleteTable = await fetch(`http://localhost:${PORT}/tables/${table}`, { 
            method: "DELETE",
            headers: { "authorization": `Bearer ${token}` }
        });
        const jsonData = await deleteTable.json();
        return jsonData;
    } catch (err) {
        console.error(err.message);
    }
};

export { getToken, getTablesNames, getTableContent, getTableColumnsNames, deleteTable };