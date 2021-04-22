
export default class Graph {

    graphId = null;

    type = null;

    constructor() {
        if (this.constructor === Graph) 
            throw new Error("Can't instantiate abstract class!");
    }

    set graphId(id) {
        this._graphId = id;
    }

    get graphId() {
        return this._graphId;
    }

    set type(type) {
        this._type = type;
    }

    get type() {
        return this._type;
    }
}