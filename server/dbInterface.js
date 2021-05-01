const PORT = 5000;

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk0NDQzMjB9.OhXJ3Rhs2I7SW1KzmHEtz9I-Zxpy5KZhDtrOaURpZRQ";

const getToken = async () => {
    try {
        const username = "tmp";
        const response = await fetch(`http://localhost:${PORT}/login`, {
            body: JSON.stringify(username),
            method: "POST"
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        return err.message;
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
        return err.message;
    }
};

const getTableContent = async table => {
    try {
        const response = await fetch(`http://localhost:${PORT}/tables/${table}`, {
            headers: { "authorization": `Bearer ${token}` }
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        return err.message;
    }
};

const getTableColumnsNames = async table => {
    try {
        const response = await fetch(`http://localhost:${PORT}/tables/${table}/columnsnames`, {
            headers: { "authorization": `Bearer ${token}` }
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        return err.message;
    }
};

// Non va
const getSelectedCol = async table => {
    try {
        const response = await fetch(`http://localhost:${PORT}/tables/selectedcol/${table}`, {
            headers: { "authorization": `Bearer ${token}` }
            // passare array con nomi colonne selezionate
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        return err.message;
    }
};

// Non va 
const importDataset = async table => {
    try {
        const response = await fetch(`http://localhost:${PORT}/tables/${table}`, {
            headers: { "authorization": `Bearer ${token}` },
            method: "POST"
        });
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        return err.message;
    }
};

const deleteTable = async table => {
    try {
        const delTable = await fetch(`http://localhost:${PORT}/tables/${table}`, { 
            headers: { "authorization": `Bearer ${token}` },
            method: "DELETE"
        });
        const jsonData = await delTable.json();
        return jsonData;
    } catch (err) {
        return err.message;
    }
};

export { getToken, getTablesNames, getTableContent, getTableColumnsNames, getSelectedCol, importDataset, deleteTable };