const {transpose} = require('mathjs');
const {Data} = require('./Data');

class Model {

    constructor() {
        this._originalData = new Data();
        this._graphs = [];
        this._selectedFeatures = [];
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
        this.setSelectedData();
    }
    
    setSelectedData() {
        let res = [];
        for (let i = 0; i < this._selectedFeatures.length; ++i) {
            res[i] = [];
            let feature = this._selectedFeatures[i];
            let col = this._originalData.getCol(feature);
            res[i] = col;
        }
        res = transpose(res);
        this._selectedData = res;
    }

    // getters
    get getOriginalData() {
        return this._originalData;
    }

    get getGraphs() {
        return this._graphs;
    }

    get getSelectedFeatures() {
        return this._selectedFeatures;
    }

    get getSelectedData() {
        return this._selectedData;
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