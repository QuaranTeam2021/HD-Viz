/* eslint-disable class-methods-use-this */
import * as druid from "@saehrimnir/druidjs";
import AlgorithmStrategy from '../AlgorithmStrategy';

export default class ISOMAP extends AlgorithmStrategy {

    compute(parameters) {
        let data = druid.Matrix.from(parameters.data);
        let metric = this.getMetric(parameters.metric);
        let strategy = new druid.ISOMAP(data, parameters.neighbors, parameters.dimensions, metric);
        let res = strategy.transform();
        return ISOMAP.get2dArray(res.to2dArray);
    }
}