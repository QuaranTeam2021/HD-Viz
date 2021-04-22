import DistanceData from '../DistanceData';
import Graph from '../Graph';

export default class DistanceBasedGraph extends Graph {

    data = new DistanceData();

    constructor(graphId, type, data) {
        super();
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