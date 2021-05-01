/* eslint-disable class-methods-use-this */
import Parameters from '../Parameters';

export default class PcaParameters extends Parameters {

    constructor(dimensions, data = []) {
        super();
        this.data = data;
        this.dimensions = dimensions;
    }   
}