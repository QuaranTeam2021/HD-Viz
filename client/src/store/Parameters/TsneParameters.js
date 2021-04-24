/* eslint-disable class-methods-use-this */
import Parameters from '../Parameters';

export default class TsneParameters extends Parameters {

    constructor(dimensions, perplexity, epsilon, metric, data = []) {
        super();
        this.data = data;
        this.dimensions = dimensions;
        this.perplexity = perplexity;
        this.epsilon = epsilon;
        this.metric = metric;
    }   

    get perplexity() {
        return this.perplexity;
    }

    get epsilon() {
        return this.epsilon;
    }

    get metric () {
        return this.metric;
    }
}