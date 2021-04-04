/* eslint-disable accessor-pairs */
/* eslint-disable no-underscore-dangle */
import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';
const { transpose } = require('mathjs');
const { Data } = require('./Data');
const {PCA, UMAP, FASTMAP, ISOMAP, TSNE, LLE} = require('./AlgorithmUtility');

export class Model {

    _originalData = null;

    _graphs = [];

    _features = [];
    
    _selectedFeatures = [];
    
    _selectedData = null;
    
    constructor() {
        makeAutoObservable(this);
        this._originalData = new Data();
        this._selectedData = new Data();
    }

    // setters
    set setOriginalData(data) {
        this._originalData = data;
        this._selectedData = data;
        this._features = data[0];
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
        } 
        throw new Error('Out of bounds...')
    }

    getGraphStateIndexById(id) {
        let res;
        for (let i = 0; i < this._graphs.length; ++i) {
            let g = this._graphs[i].getGraphId;
            if (g === id) {
               res = i;
               break;
            }
        }
        if (res) 
            return res;
        throw new Error('Id grafico non presente');
    }
    
    calculateReduction(algorithm, param, graphId) {
        let res;
        switch (algorithm) {
            case 'pca': res = new PCA().compute(this._selectedData.getMatrix, param);
                break;
            case 'umap': res = new UMAP().compute(this._selectedData.getMatrix, param);
                break;
            case 'fastmap': res = new FASTMAP().compute(this._selectedData.getMatrix, param);
                break;
            case 'isomap': res = new ISOMAP().compute(this._selectedData.getMatrix, param);
                break;
            case 't-sne': res = new TSNE().compute(this._selectedData.getMatrix, param);
                break;
            case 'lle': res = new LLE().compute(this._selectedData.getMatrix, param);
                break;
            default:
                break;
        }
        let index = this.getGraphStateIndexById(graphId);
        this._graphs[index].setDataset = res; 
    }

    reset() {
        this._originalData = [];
        this._graphs = [];
        this._selectedData = [];
        this._selectedFeatures = [];
    }
}

export const ModelContext = createContext(Model);
export const useModel = () => useContext(ModelContext);