/* eslint-disable class-methods-use-this */
import Parameters from '../Parameters';

export default class IsomapLleParameters extends Parameters {

    constructor(dimensions, neighbors, metric, data = []) {
        super();
        this.data = data;
        this.dimensions = dimensions;
        this.neighbors = neighbors;
        this.metric = metric;
    }   

    get neighbors() {
        return this._neighbors;
    }

    set neighbors(neighbors) {
        this._neighbors = neighbors;
    }

    get metric() {
        return this._metric;
    }

    set metric(metric) {
        this._metric = metric;
    }
}