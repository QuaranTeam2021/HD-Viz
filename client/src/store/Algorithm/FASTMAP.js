/* eslint-disable class-methods-use-this */
import * as druid from "@saehrimnir/druidjs";
import AlgorithmStrategy from '../AlgorithmStrategy';

export default class FASTMAP extends AlgorithmStrategy {

    compute(parameters) {
        let data = druid.Matrix.from(parameters.data);
        let metric = this.getMetric(parameters.metric);
        let strategy = new druid.FASTMAP(data, parameters.dimensions, metric);
        let res = strategy.transform();
        let reduced = FASTMAP.get2dArray(res.to2dArray);
        return FASTMAP.addHeader(reduced, parameters.dimensions);
    }
}