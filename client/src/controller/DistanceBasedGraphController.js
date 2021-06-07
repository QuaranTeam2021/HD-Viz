import { createContext, useContext } from 'react';
import Distance from '../store/Distance';
import DistanceBasedGraph from '../store/Graph/DistanceBasedGraph';

export default class DistanceBasedGraphController {

    constructor(store) {
        this.store = store;
    }

    createGraph(graphId, type, distance, features, grouper) {
        let data = this.store.calculateDistanceData(Distance[distance], features, grouper);
        let graph = new DistanceBasedGraph(graphId, type, grouper, features, data);
        this.store.addGraph(graph);
    }

    changeDistance(graphId, distance, features, grouper) {
        let data = this.store.calculateDistanceData(Distance[distance], features, grouper);
        let graph = this.store.getGraphById(graphId);
        graph.data = data;
        let index = this.store.getGraphIndexById(graphId);
        this.store.graphs[index] = graph;
    }
}

export const DistanceBasedGraphControllerContext = createContext(DistanceBasedGraph);
export const useDistanceBasedGraphController = () => useContext(DistanceBasedGraphControllerContext);