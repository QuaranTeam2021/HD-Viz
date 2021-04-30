import * as druid from '@saehrimnir/druidjs';
import { createContext, useContext } from 'react';
import DistanceBasedGraph from '../store/Graph/DistanceBasedGraph';

export default class DistanceBasedGraphController {

    constructor(store) {
        this.store = store;
    }

    createGraph(graphId, type, distance, features) {
        let data = this.store.calculateDistanceData(DistanceBasedGraphController.getMetric(distance), features);
        let graph = new DistanceBasedGraph(graphId, type, data);
        this.store.addGraph(graph);
    }

    changeDistance(graphId, distance, features) {
        let data = this.store.calculateDistanceData(distance, features);
        let graph = this.store.getGraphById(graphId);
        graph.data = data;
        let index = this.store.getGraphIndexById(graphId);
        this.store.graphs[index] = graph;
    }

    static getMetric(metric) {
        let res;
        switch (metric) {
            case "euclidean": res = druid.euclidean;
                break;
            case "manhattan": res = druid.manhattan;
                break;
            case "cosine": res = druid.cosine;
                break;
            case "euclidean_squared": res = druid.euclidean_squared;
                break;
            case "canberra": res = druid.canberra;
                break;
            case "chebyshev": res = druid.chebyshev;
                break;
            default: res = druid.euclidean;
                break;
        }
        return res;
    }

}

export const DistanceBasedGraphControllerContext = createContext(DistanceBasedGraph);
export const useDistanceBasedGraphController = () => useContext(DistanceBasedGraphControllerContext);