
/**
 * Classe generale del modello
 */
class Model {

    /**
     * @param {*} data : 2dArray => sono i dati originali
     * @param {*} graphs : array di oggetti GraphState => traccia i grafici visualizzati e le informazioni associate
     */
    constructor(data, graphs) {
        this.originalData = data;
        this.graphs = graphs;
    }

    setOriginalData(data) {
        this.originalData = data;
    }

    pushGraph(graphState) {
        (this.graphs).push(graphState);
    }

    // remove last element
    popGraph() {
        (this.graphs).pop();
    }

    removeGraphAtIndex(index) {
        (this.graphs)[index] = "toRemove";
        (this.graphs).filter(x => x !== "toRemove");
    }

    getOriginalData() {
        return this.originalData;
    }

    getGraphAtIndex(index) {
        return (this.graphs)[index];
    }

    reset() {
        this.originalData = [];
        this.graphs = [];
    }
}

exports.Model = Model;