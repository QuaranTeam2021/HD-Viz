import { createContext, useContext } from 'react';
import FASTMAP from '../store/Algorithm/FASTMAP';
import FastmapParameters from '../store/Parameters/FastmapParameters';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class FastmapController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
        this.fastmap = new FASTMAP();
        this.dimensions = null;
        this.metric = null;
    }

    createGraph(graphId, type, features) {
        let data = this.store.calculateSelectedData(features);
        data = data.slice(1);
        let parameters = new FastmapParameters(this.dimensions, this.metric, data);
        let reducedData = this.fastmap.compute(parameters);
        let graph = new StandardGraph(graphId, type, reducedData);
        this.store.addGraph(graph);
    }

    set dimensions(dimensions) {
        this._dimensions = dimensions;
    }

    set metric(metric) {
        this._metric = metric;
    }
}

export const FastmapControllerContext = createContext(FastmapController);
export const useFastmapController = () => useContext(FastmapControllerContext);