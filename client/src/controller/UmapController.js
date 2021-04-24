import { createContext, useContext } from 'react';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';
import UMAP from '../store/Algorithm/UMAP';
import UmapParameters from '../store/Parameters/UmapParameters';

export default class UmapController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
        this.umap = new UMAP();
        this.dimensions = null;
        this.neighbors = null;
    }

    createGraph(graphId, type, features) {
        let parameters = new UmapParameters(this.dimensions, this.neighbors);
        let reducedData = this.store.calculateReduction(features, this.umap, parameters);
        let graph = new StandardGraph(graphId, type, reducedData);
        this.store.addGraph(graph);
    }

    calculateReduction(graphId, features) {
        let parameters = new UmapParameters(this.dimensions, this.neighbors);
        let reducedData = this.store.calculateReduction(features, this.umap, parameters);
        let updatedGraph = this.store.getGraphById(graphId);
        updatedGraph.data = reducedData;
        let index = this.store.getGraphIndexById(graphId);
        this.store.graphs[index] = updatedGraph;
    }

    set dimensions(dimensions) {
        this._dimensions = dimensions;
    }

    set neighbors(neighbors) {
        this._neighbors = neighbors;
    }
}

export const UmapControllerContext = createContext(UmapController);
export const useUmapController = () => useContext(UmapControllerContext);