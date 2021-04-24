import { createContext, useContext } from 'react';
import ISOMAP from '../store/Algorithm/ISOMAP';
import IsomapLleParameters from '../store/Parameters/IsomapLleParameters';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class IsomapController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
        this.isomap = new ISOMAP();
        this.dimensions = null;
        this.neighbors = null;
        this.metric = null;
    }

    createGraph(graphId, type, features) {
        let parameters = new IsomapLleParameters(this.dimensions, this.neighbors, this.metric);
        let reducedData = this.store.calculateReduction(features, this.isomap, parameters)
        let graph = new StandardGraph(graphId, type, reducedData);
        this.store.addGraph(graph);
    }

    calculateReduction(graphId, features) {
        let parameters = new IsomapLleParameters(this.dimensions, this.neighbors, this.metric);
        let reducedData = this.store.calculateReduction(features, this.isomap, parameters)
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

export const IsomapControllerContext = createContext(IsomapController);
export const useIsomapController = () => useContext(IsomapControllerContext);