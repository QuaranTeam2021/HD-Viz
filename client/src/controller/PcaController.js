import { createContext, useContext } from 'react';
import PCA from '../store/Algorithm/PCA';
import PcaParameters from '../store/Parameters/PcaParameters';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class PcaController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
        this.pca = new PCA();
        this.dimensions = null;
    }

    createGraph(graphId, type, features) {
        let parameters = new PcaParameters(this._dimensions);
        let reducedData = this.store.calculateReduction(features, this.pca, parameters);
        let graph = new StandardGraph(graphId, type, reducedData);
        this.store.addGraph(graph);
    }

    calculateReduction(graphId, features) {
        let parameters = new PcaParameters(this._dimensions);
        let reducedData = this.store.calculateReduction(features, this.pca, parameters);
        let updatedGraph = this.store.getGraphById(graphId);
        updatedGraph.data = reducedData;
        let index = this.store.getGraphIndexById(graphId);
        this.store.graphs[index] = updatedGraph;
    }

    set dimensions(dimensions) {
        this._dimensions = dimensions;
    }
}

export const PcaControllerContext = createContext(PcaController);
export const usePcaController = () => useContext(PcaControllerContext);