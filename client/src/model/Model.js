const {concat} = require('mathjs');
const { Data } = require('./Data');

class Model {

    constructor(data = new Data(), graphs = [], selectedFeatures = []) {
        this._originalData = data;
        this._graphs = graphs;
        this._selectedFeatures = selectedFeatures;
        this.setSelectedData();
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

    get selectedFeatures() {
        return this._selectedFeatures;
    }

    async setSelectedData() {
        let res = [];
        for (let i = 0; i < this._selectedFeatures.length; ++i) {
            let feature = this._selectedFeatures[i];
            let col = this._originalData.getCol(feature);
            res = concat(res, col);
        }
        return res;
    }

    addGraphState(graphState) {
        this._graphs.push(graphState);
    }

    removeGraphStateAtIndex(index) {
        this._graphs[index] = "toRemove";
        this._graphs = this._graphs.filter(x => x !== "toRemove");
    }

    getGraphStateAtIndex(index) {
        if (index < this._graphs.length && index >= 0) {
            let GraphState = this._graphs[index];
            return GraphState;
        } else throw new Error ('Out of bounds...')
    }

    async calculateReduction(algorithm, param, graphId) {
        // TODO
    }

    reset() {
        this._originalData = [];
        this._graphs = [];
        this._selectedData = [];
        this._selectedFeatures = [];
    }
}

exports.Model = Model;