
export default class Graph {

    graphId = null;

    type = null;

    constructor() {
        if (this.constructor === Graph) 
            throw new Error("Can't instantiate abstract class!");
    }

    set graphId(id) {
        this.graphId = id;
    }

    get graphId() {
        return this.graphId;
    }

    set type(type) {
        this.type = type;
    }

    get type() {
        return this.type;
    }
}