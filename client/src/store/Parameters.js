/* eslint-disable class-methods-use-this */
import Data from './Data';

export default class Parameters {

    data = new Data([]);

    dimensions = null;

    constructor() {
        if (this.constructor === Parameters) 
            throw new Error("Can't instantiate abstract class!");
    }

    set data(data) {
        this.data = data;
    }

    get data() {
        return this.data;
    }

    get dimensions() {
        return this.dimensions;
    }    
}