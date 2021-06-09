import { createContext, useContext } from 'react';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class StandardController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
    }

    createGraph(graphId, type, features, grouper, normalize = true) {
        let data = normalize ? this.store.normalizeData(features) : this.store.calculateSelectedData(features);
        let grouperCol = this.store.calculateSelectedData(grouper).flat();
        for (let i = 0; i < data.length; ++i) {
            data[i].push(grouperCol[i]);
        }
        let graph = new StandardGraph(graphId, type, grouper.toString(), features, data);
        this.store.addGraph(graph);
    }
}

export const StandardControllerContext = createContext(StandardController);
export const useStandardController = () => useContext(StandardControllerContext);