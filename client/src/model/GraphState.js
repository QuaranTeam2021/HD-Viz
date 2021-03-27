
class GraphState {

    constructor(id, dataset = []) {
        this._graphId = id;
        this._dataset = dataset;
    }

    set setGraphId(id) {
        this._graphId = id;
    }

    set setDataset(d) {
        this._dataset = d;
    }

    get getGraphId() {
        return this._graphId;
    }

    get getDataset() {
        return this._dataset;
    }
}

exports.GraphState = GraphState;