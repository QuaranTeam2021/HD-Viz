/* eslint-disable class-methods-use-this */
import Data from '../Data';
import Parameters from '../Parameters';

export default class IsomapLleParameters extends Parameters {

    constructor(dimensions, neighbors, metric, data = new Data([])) {
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