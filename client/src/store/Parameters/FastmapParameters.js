/* eslint-disable class-methods-use-this */
import Parameters from '../Parameters';

export default class FastmapParameters extends Parameters {

    constructor(dimensions, metric, data = []) {
        super();
        this.data = data;
        this.dimensions = dimensions;
        this.metric = metric;
    }   

    get metric() {
        return this._metric;
    }

    set metric(metric) {
        this._metric = metric;
    }
}