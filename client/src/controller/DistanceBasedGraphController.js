import { createContext, useContext } from 'react';
import Distance from '../store/Distance';
import DistanceBasedGraph from '../store/Graph/DistanceBasedGraph';

export default class DistanceBasedGraphController {

    constructor(store) {
        this.store = store;
    }

    createGraph(graphId, type, distance, features, grouper, normalize = true) {
        let data = this.store.calculateDistanceData(Distance[distance], features, grouper, normalize);
        let graph = new DistanceBasedGraph(graphId, type, grouper, features, data);
        this.store.addGraph(graph);
    }
}

export const DistanceBasedGraphControllerContext = createContext(DistanceBasedGraph);
export const useDistanceBasedGraphController = () => useContext(DistanceBasedGraphControllerContext);