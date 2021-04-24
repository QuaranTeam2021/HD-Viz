import { createContext, useContext } from 'react';
import IsomapLleParameters from '../store/Parameters/IsomapLleParameters';
import LLE from '../store/Algorithm/LLE';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class LleController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
        this.lle = new LLE();
        this.dimensions = null;
        this.neighbors = null;
        this.metric = null;
    }

    createGraph(graphId, type, features) {
        let parameters = new IsomapLleParameters(this.dimensions, this.neighbors, this.metric);
        let reducedData = this.store.calculateReduction(features, this.lle, parameters);
        let graph = new StandardGraph(graphId, type, reducedData);
        this.store.addGraph(graph);
    }

    calculateReduction(graphId, features) {
        let parameters = new IsomapLleParameters(this.dimensions, this.neighbors, this.metric);
        let reducedData = this.store.calculateReduction(features, this.lle, parameters);
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
    
    set metric(metric) {
        this._metric = metric;
    }
}

export const LleControllerContext = createContext(LleController);
export const useLleController = () => useContext(LleControllerContext);