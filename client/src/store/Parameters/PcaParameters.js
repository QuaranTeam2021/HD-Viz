/* eslint-disable class-methods-use-this */
import Data from './Data';
import Parameters from '../Parameters';

export default class PcaParameters extends Parameters {

    constructor(data = new Data([]), dimensions) {
        this.data = data;
        this.dimensions = dimensions;
    }   
}