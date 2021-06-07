import DistanceData from '../DistanceData';
import Graph from '../Graph';

export default class DistanceBasedGraph extends Graph {

    data = new DistanceData();

    constructor(graphId, type, grouper, selectedFeatures = [], data = []) {
        super();
        this.graphId = graphId;
        this.type = type;
        this.grouper = grouper;
        this.selectedFeatures = selectedFeatures;
        this.data = data;
    }

    set data(data) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

}