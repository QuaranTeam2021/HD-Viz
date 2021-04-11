
class Model {

    constructor(data, graphs, selectedFeatures) {
        this._originalData = data;
        this._graphs = graphs;
        this._selectedFeatures = selectedFeatures;
    }

    // setters
    set setOriginalData(data) {
        this._originalData = data;
    }

    set setGraphs(graphs) {
        this._graphs = graphs;
    }

    set setSelectedFeatures(sF) {
        this._selectedFeatures = sF;
    }

    // getters
    get getOriginalData() {
        return this._originalData;
    }

    get getGraphs() {
        return this._graphs;
    }

    pushGraphState(graphState) {
        this.graphs.push(graphState);
    }

    removeGraphStateAtIndex(index) {
        this.graphs[index] = "toRemove";
        this.graphs = this.graphs.filter(x => x != "toRemove");
    }

    getGraphState(index = this.graphs.length - 1) {
        return this._graphs[index];
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
        return GraphState.getSelectedFeatures();
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