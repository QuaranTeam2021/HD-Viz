
export default class DistanceData {

    nodes = [];
    
    links = [];

    constructor(nodes, links) {
        this.nodes = nodes;
        this.links = links;
    }

    set nodes(nodes) {
        this.nodes = nodes;
    }

    get nodes() {
        return this.nodes;
    }

    set links(links) {
        this.links = links;
    }

    get links() {
        return this.links;
    }

}