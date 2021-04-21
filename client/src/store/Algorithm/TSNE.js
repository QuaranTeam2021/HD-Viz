/* eslint-disable class-methods-use-this */
import AlgorithmStrategy from '../AlgorithmStrategy';
import * as druid from "@saehrimnir/druidjs";

export default class TSNE extends AlgorithmStrategy {

    compute(parameters) {
        let data = druid.Matrix.from(parameters.data);
        let metric = this.getMetric(parameters.metric);
        let strategy = new druid.TSNE(data, parameters.perplexity, parameters.epsilon, parameters.dimensions, metric);
        let res = strategy.transform();
        return this.get2dArray(res.to2dArray);
    }
}