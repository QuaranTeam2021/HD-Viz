import { createContext, useContext } from 'react';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class StandardController extends StandardGraphController {

    createGraph(graphId, type, features) {
        let data = this.store.calculateSelectedData(features);
        let graph = new StandardGraph(graphId, type, data);
        this.store.addGraph(graph);
    }
}

export const StandardControllerContext = createContext(StandardController);
export const useStandardController = () => useContext(StandardControllerContext);