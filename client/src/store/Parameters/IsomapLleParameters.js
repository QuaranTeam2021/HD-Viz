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
        return this.neighbors;
    }

    get metric() {
        return this.metric;
    }
}