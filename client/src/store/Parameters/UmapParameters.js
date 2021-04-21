/* eslint-disable class-methods-use-this */
import Data from './Data';
import Parameters from '../Parameters';

export default class UmapParameters extends Parameters {

    constructor(data = new Data([]), dimensions, neighbors) {
        this.data = data;
        this.dimensions = dimensions;
        this.neighbors = neighbors;
    }   

    get neighbors() {
        return this.neighbors;
    }
}