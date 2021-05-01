
export default class DistanceData {

    constructor(nodes = [], links = []) {
        this.nodes = nodes;
        this.links = links;
    }

    set nodes(nodes) {
        this._nodes = nodes;
    }

    get nodes() {
        return this._nodes;
    }

    set links(links) {
        this._links = links;
    }

    get links() {
        return this._links;
    }

}