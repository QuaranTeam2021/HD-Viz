/**
 * @abstract
 */
class Graph {

    constructor() {
        if(this.constructor === Graph)
            throw new Error("Can't instantiate abstract class!");
    }

    setData(data) {
        this.data = data;
    }

    setName(name) {
        this.name = name;
    }

    getData() {
        return this.data;
    }

    getName() {
        return this.name;
    }

    build() {}
}

exports.Graph = Graph;