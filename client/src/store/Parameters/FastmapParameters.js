/* eslint-disable class-methods-use-this */
import Data from './Data';
import Parameters from '../Parameters';

export default class FastmapParameters extends Parameters {

    constructor(dimensions, metric, data = new Data([])) {
        super();
        this.data = data;
        this.dimensions = dimensions;
        this.metric = metric;
    }   

    get metric() {
        return this.metric;
    }
}