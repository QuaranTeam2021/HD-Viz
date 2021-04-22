/* eslint-disable class-methods-use-this */
import Data from '../Data';
import Parameters from '../Parameters';

export default class UmapParameters extends Parameters {

    constructor(dimensions, neighbors, data = new Data([])) {
        super();
        this.data = data;
        this.dimensions = dimensions;
        this.neighbors = neighbors;
    }   

    get neighbors() {
        return this.neighbors;
    }
}