import DistanceBasedGraph from '../store/Graph/DistanceBasedGraph';

export default class DistanceBasedGraphController {

    constructor(store) {
        this.store = store;
    }

    createGraph(graphId, type, distance, features) {
        let data = this.store.calculateDistanceData(distance, features);
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
}