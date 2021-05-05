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

    createGraph(graphId, type, features, grouper) {
        let parameters = new FastmapParameters(this._dimensions, this._metric);
        let reducedData = this.store.calculateReduction(features, this.fastmap, parameters);
        let grouperCol = this.store.calculateSelectedData(grouper).flat();
        for (let i = 0; i < reducedData.length; ++i) {
            reducedData[i].push(grouperCol[i]);
        }
        let graph = new StandardGraph(graphId, type, grouper, reducedData);
        this.store.addGraph(graph);
    }

    calculateReduction(graphId, features) {
        let parameters = new FastmapParameters(this._dimensions, this._metric);
        let reducedData = this.store.calculateReduction(features, this.fastmap, parameters);
        let updatedGraph = this.store.getGraphById(graphId);
        updatedGraph.data = reducedData;
        let index = this.store.getGraphIndexById(graphId);
        this.store.graphs[index] = updatedGraph;
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