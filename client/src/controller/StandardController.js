import { createContext, useContext } from 'react';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class StandardController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
    }

    createGraph(graphId, type, features, grouper) {
        features.push(grouper[0]);
        let data = this.store.calculateSelectedData(features);
        let graph = new StandardGraph(graphId, type, grouper, data);
        this.store.addGraph(graph);
    }

    removeGraph(graphId) {
        this.store.removeGraph(graphId);
    }
}

export const StandardControllerContext = createContext(StandardController);
export const useStandardController = () => useContext(StandardControllerContext);