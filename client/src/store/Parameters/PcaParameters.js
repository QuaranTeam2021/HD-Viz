/* eslint-disable class-methods-use-this */
import Data from '../Data';
import Parameters from '../Parameters';

export default class PcaParameters extends Parameters {

    constructor(dimensions, data = new Data([])) {
        super();
        this.data = data;
        this.dimensions = dimensions;
    }   
}