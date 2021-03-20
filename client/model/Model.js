
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

    pushGraphState(graphState) {
        this.graphs.push(graphState);
    }

    // remove last element
    popGraphState() {
        this.graphs.pop();
    }

    removeGraphStateAtIndex(index) {
        this.graphs[index] = "toRemove";
        this.graphs = this.graphs.filter(x => x != "toRemove");
    }

    getOriginalData() {
        return this.originalData;
    }

    getGraphs() {
        return this.graphs;
    }

    getGraphState(index = this.graphs.length - 1) {
        return this.graphs[index];
    }

    getGraphAtIndex(index) {
        let GraphState = this.graphs[index];
        return GraphState.getGraph();
    }

    getAlgorithmAtIndex(index) {
        let GraphState = this.graphs[index];
        return GraphState.getAlgorithm();
    }

    getSelectedFeaturesAtIndex(index) {
        let GraphState = this.graphs[index];
        return GraphState.getFeatures();
    }

    getGraphsNumber() {
        return this.graphs.length;
    }

    reset() {
        this.originalData = [];
        this.graphs = [];
    }
}

exports.Model = Model;