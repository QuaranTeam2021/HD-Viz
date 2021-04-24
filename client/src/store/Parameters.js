/* eslint-disable class-methods-use-this */
import Data from './Data';

export default class Parameters {

    data = [];

    dimensions = null;

    constructor() {
        if (this._constructor === Parameters) 
            throw new Error("Can't instantiate abstract class!");
    }

    set data(data) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    set dimensions(dimensions) {
        this._dimensions = dimensions;
    }

    get dimensions() {
        return this._dimensions;
    }    
}