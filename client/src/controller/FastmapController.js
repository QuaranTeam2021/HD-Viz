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
        this.metric = null;
    }

    createGraph(graphId, type, features, grouper, normalize = true) {
        let parameters = new FastmapParameters(this._dimensions, this._metric);
        let reducedData = this.store.calculateReduction(features, this.fastmap, parameters, normalize);
        let grouperCol = this.store.calculateSelectedData(grouper).flat();
        for (let i = 0; i < reducedData.length; ++i) {
            reducedData[i].push(grouperCol[i]);
        }
        let graph = new StandardGraph(graphId, type, grouper.toString(), features, reducedData);
        this.store.addGraph(graph);
    }

    set metric(metric) {
        this._metric = metric;
    }
}

export const FastmapControllerContext = createContext(FastmapController);
export const useFastmapController = () => useContext(FastmapControllerContext);