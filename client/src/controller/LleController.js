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
        let data = this.store.calculateSelectedData(features);
        data = data.slice(1);
        let parameters = new IsomapLleParameters(this.dimensions, this.neighbors, this.metric, data);
        let reducedData = this.lle.compute(parameters);
        let graph = new StandardGraph(graphId, type, reducedData);
        this.store.addGraph(graph);
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