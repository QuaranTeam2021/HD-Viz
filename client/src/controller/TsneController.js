import { createContext, useContext } from 'react';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';
import TSNE from '../store/Algorithm/TSNE';
import TsneParameters from '../store/Parameters/TsneParameters';

export default class TsneController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
        this.tsne = new TSNE();
        this.dimensions = null;
        this.perplexity = null;
        this.epsilon = null;
        this.metric = null;
    }

    createGraph(graphId, type, features) {
        let parameters = new TsneParameters(this._dimensions, this._perplexity, this._epsilon, this._metric);
        let reducedData = this.store.calculateReduction(features, this.tsne, parameters);
        let graph = new StandardGraph(graphId, type, reducedData);
        this.store.addGraph(graph);
    }

    calculateReduction(graphId, features) {
        let parameters = new TsneParameters(this._dimensions, this._perplexity, this._epsilon, this._metric);
        let reducedData = this.store.calculateReduction(features, this.tsne, parameters);
        let updatedGraph = this.store.getGraphById(graphId);
        updatedGraph.data = reducedData;
        let index = this.store.getGraphIndexById(graphId);
        this.store.graphs[index] = updatedGraph;
    }

    set dimensions(dimensions) {
        this._dimensions = dimensions;
    }

    set perplexity(perplexity) {
        this._perplexity = perplexity;
    }

    set epsilon(epsilon) {
        this._epsilon = epsilon;
    }

    set metric(metric) {
        this._metric = metric;
    }
}

export const TsneControllerContext = createContext(TsneController);
export const useTsneController = () => useContext(TsneControllerContext);