import Graph from './Graph';
import DistanceData from './DistanceData';

export default class DistanceBasedGraph extends Graph {

    data = new DistanceData();

    constructor(graphId, type, data) {
        this.graphId = graphId;
        this.type = type;
        this.data = data;
    }

    set data(data) {
        this.data = data;
    }

    get data() {
        return this.data;
    }

}