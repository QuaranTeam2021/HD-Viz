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

    features = new Map();
    
    constructor() {
        makeAutoObservable(this);
        this.originalData = new Data([]);
    }

    loadData(data) {
        this.originalData = data;
        const header = this.originalData.features;
        const firstDataRow = this.originalData.matrix[1];
        let features = new Map();
        for (let i = 0; i < header.length; ++i) {
            features.set(header[i], typeof firstDataRow[i] === "number" ? "number" : "string");
        }
        this.features = features;
    } 

    set originalData(data) {
        this._originalData = new Data(data);
    }

    get originalData() {
        return this._originalData;
    }
    
    /**
     * @param {Map} features: a map <String, boolean>
     */
    set features(features) {
        this._features = features;
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
        return this.graphs.find(g => g.graphId === graphId);
    }

    // eslint-disable-next-line consistent-return
    getGraphIndexById(graphId) {
        for (let i = 0; i < this.graphs.length; ++i) {
            let g = this.graphs[i];
            if (g.graphId === graphId) 
                return i;
        }
        console.error('Id non presente');
    }

    removeGraph(graphId) {
        this.graphs = this.graphs.filter(g => g.graphId !== graphId);
    }

    reset() {
        this.originalData = [];
        this.graphs = [];
        this.features.clear();
    }

    getNumericFeatures() {
        let numericFeatures = [];
        this.features.forEach((value, key) => {
            if (value === "number") numericFeatures.push(key);
        })
        return numericFeatures;
    }
    
    getStringFeatures() {
        let stringFeatures = [];
        this.features.forEach((value, key) => {
            if (value === "string") stringFeatures.push(key);
        })
        return stringFeatures;
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
     * Return normalized data, WITH HEADERS IN LINE 0
     * @param {Array<string>} cols set of columns to normalize data
     * @return {Array<Object>} normalized data, WITH HEADERS IN LINE 0
     */
    normalizeData(cols) {

        let result = this.calculateSelectedData(cols);
        let numericData = result.slice(1,);

        for (let col = 0; col < cols.length; ++col) {

            // eslint-disable-next-line no-extra-parens
            const factor = Math.max(...numericData.map(el => (isNaN(el[col]) ? Number.MIN_VALUE : el[col])));
            if (factor !== 0 && !isNaN(factor) && factor !== undefined && factor !== null) {
                for (let i = 0; i < numericData.length; ++i) {
                    let row = numericData[i];
                    row[col] = row[col] / factor;
                }
            }
        }
        return result;
    }

     /**
        * Calculate distance matrix.
        * @param {function} distFunc druid object (es. druid.euclidean)
        * @param {Array<string>} cols set of columns to calculate distance
        * @param {string} grouper grouping column
        * @return {Object} DistanceData instance
        */
    calculateDistanceData(distFunc, cols, grouper, boolNormalize) {

        let data = this.calculateSelectedData(cols),
            groups = this.calculateSelectedData(grouper).flat(),
            header = data[0],
            links = [], 
            nodes = []; 
        for (let i = 1; i < data.length; ++i) {
            let node = {id: "nodo_"+i};
            data[i].forEach((el, idx) => {
                node[header[idx]] = el;
            })
            // node.id = "nodo_"+i;
            node.group = String(groups[i]);
            nodes.push(node);
        }

        if (boolNormalize) {
            data = this.normalizeData(cols);
        }

        let matrix = new DistanceData();
        for (let i = 1; i < data.length; ++i) {
            for (let j = i+1; j < data.length; ++j) {
                const link = {
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

    calculateReduction(features, strategy, parameters, boolNormalize) {
        let data = boolNormalize ? this.normalizeData(features) : this.calculateSelectedData(features);  
        data = data.slice(1);
        parameters.data = data;
        return strategy.compute(parameters);
    }
}

export const StoreContext = createContext(Store);
export const useStore = () => useContext(StoreContext);