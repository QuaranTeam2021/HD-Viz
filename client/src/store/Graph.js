
export default class Graph {

    graphId = null;

    type = null;

    constructor() {
        if (this.constructor === Graph) 
            throw new Error("Can't instantiate abstract class!");
    }

    set setGraphId(id) {
        this.graphId = id;
    }

    get getGraphId() {
        return this.graphId;
    }

    set type(type) {
        this.type = type;
    }

    get type() {
        return this.type;
    }
}