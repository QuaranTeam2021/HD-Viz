/* eslint-disable prefer-template */
/* eslint-disable space-infix-ops */
import { createContext, useContext } from 'react';
import Data from './Data';
import DistanceData from './DistanceData';
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

    getGraphIndexById(graphId) {
        for (let i = 0; i < this.graphs.length; ++i) {
            let g = this.graphs[i];
            if (g.graphId === graphId) 
                return i;
        }
        throw new Error('Id non presente');
    }

    removeGraph(graphId) {
        let index = this.getGraphIndexById(graphId);
        this.graphs[index] = "toRemove";
        this.graphs = this.graphs.filter(x => x !== "toRemove");
    }

    reset() {
        this.originalData = new Data([]);
        this.graphs = [];
        this.features = [];
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

     /**
        * Calculate distance matrix.
        * @param {function} distFunc druid object (es. druid.euclidean)
        * @param {Array<string>} cols set of columns to calculate distance
        * @param {string} grouper grouping column
        * @return {Object} DistanceData instance
        */
    calculateDistanceData(distFunc, cols, grouper) {
        let data = this.calculateSelectedData(cols);

        let matrix = new DistanceData();
        let links = [], 
            nodes = [];
        for (let i = 0; i < data.length; i++) {
            let node = data[i];
            node.id="nodo_"+i;
            node.group = node[grouper];
            nodes.push(node);
            for (let j = i+1; j < data.length; j++) {
                let link = {
                    source: "nodo_"+i,
                    target: "nodo_"+j,
                    value: distFunc(data[i], data[j])
                };
                links.push(link);
            }
        }
        matrix.nodes = nodes;
        matrix.links = links;
        return matrix;
    }

    calculateReduction(features, strategy, parameters) {
        let data = this.calculateSelectedData(features);
        data = data.slice(1);
        parameters.data = data;
        return strategy.compute(parameters);
    }
}

export const StoreContext = createContext(Store);
export const useStore = () => useContext(StoreContext);