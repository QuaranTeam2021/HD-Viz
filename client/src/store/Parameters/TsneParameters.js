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
        return this._perplexity;
    }

    set perplexity(perplexity) {
        this._perplexity = perplexity;
    }

    get epsilon() {
        return this._epsilon;
    }

    set epsilon(epsilon) {
        this._epsilon = epsilon;
    }

    get metric () {
        return this._metric;
    }

    set metric(metric) {
        this._metric = metric;
    }
}