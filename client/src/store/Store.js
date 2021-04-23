import { createContext, useContext } from 'react';
import Data from './Data';
import { makeAutoObservable } from 'mobx';
import { transpose } from 'mathjs';

export default class Store {

    originalData = new Data([]);

    graphs = [];

    features = [];
    
    constructor() {
        makeAutoObservable(this);
        this.originalData = new Data([]);
    }

    set originalData(data) {
        this._originalData = new Data(data);
        this._features = this.originalData.features;
    }

    get originalData() {
        return this._originalData;
    }
    
    set features(feat) {
        this._features = feat;
    }

    get features() {
        return this._features;
    }

    set graphs(graphs) {
        this._graphs = graphs;
    }

    get graphs() {
        return this._graphs;
    }

    addGraph(graph) {
        this.graphs.push(graph);
    }

    updateGraph(index, graph) {
        this.graphs[index] = graph;
    }

    getGraphById(graphId) {
        let graph;
        this.graphs.forEach(g => {
            if (graphId === g.graphId) 
                graph = g;
        })
        return graph;
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

    calculateSelectedData(selectedFeatures) {
        let res = [];
        for (let i = 0; i < selectedFeatures.length; ++i) {
            res[i] = [];
            let feature = selectedFeatures[i];
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