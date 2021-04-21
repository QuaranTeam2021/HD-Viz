import Graph from './Graph';

export default class StandardGraph extends Graph {

    data = [];

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