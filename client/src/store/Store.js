import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';
const { transpose } = require('mathjs');
const { Data } = require('./Data');

export class Store {

    originalData = [];

    graphs = [];

    features = [];
    
    constructor() {
        makeAutoObservable(this);
        this.originalData = new Data([]);
    }

    set setOriginalData(data) {
        this._originalData = data;
    }

    get getOriginalData() {
        return this.originalData;
    }
    
    set features(feat) {
        this._features = feat;
    }

    get features() {
        return this.features;
    }

    get getGraphs() {
        return this.graphs;
    }

    addGraph(graph) {
        this.graphs.push(graph);
    }

    updateGraph(index, graph) {
        this.graphs[index] = graph;
    }

    getGraphById(graphId) {
        for (let i = 0; i < this.graphs.length; ++i) {
            let g = this.graphs[i];
            if (g.getGraphId === graphId) 
                return g;
        }
        throw new Error('Id non presente');
    }

    getGraphIndex(graphId) {
        for (let i = 0; i < this.graphs.length; ++i) {
            let g = this.graphs[i];
            if (g.getGraphId === graphId) 
                return i;
        }
        throw new Error('Id non presente');
    }

    removeGraphAtIndex(index) {
        this.graphs[index] = "toRemove";
        this.graphs = this.graphs.filter(x => x !== "toRemove");
    }

    reset() {
        this.originalData = new Data([]);
        this.graphs = [];
        this.features = [];
    }

    getGraphStateIndexById(id) {
        let res;
        for (let i = 0; i < this.graphs.length; ++i) {
            let g = this.graphs[i].getGraphId;
            if (g === id) {
               res = i;
               break;
            }
        }
        if (res) 
            return res;
        throw new Error('Id grafico non presente');
    }

    calculateSelectedData(sel) {
        let selectedFeatures = Array.from(sel);
        let res = [];
        for (let i = 0; i < this.selectedFeatures.length; ++i) {
            res[i] = [];
            let feature = this.selectedFeatures[i];
            let col = this.originalData.getCol(feature);
            res[i] = col;
        }
        res = transpose(res);
        return res;
    }

 //   calculateDistanceData() {}

    calculateReduction(features, strategy, parameters) {
        let data = this.calculateSelectedData(features);
        parameters.setData(data);
        return strategy.compute(parameters);
    }
}

export const StoreContext = createContext(Store);
export const useStore = () => useContext(StoreContext);