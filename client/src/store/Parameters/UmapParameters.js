/* eslint-disable class-methods-use-this */
import Parameters from '../Parameters';

export default class UmapParameters extends Parameters {

    constructor(dimensions, neighbors, data = []) {
        super();
        this.data = data;
        this.dimensions = dimensions;
        this.neighbors = neighbors;
    }   

    get neighbors() {
        return this.neighbors;
    }
}