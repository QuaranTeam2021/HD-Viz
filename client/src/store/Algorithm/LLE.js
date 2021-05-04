/* eslint-disable class-methods-use-this */
import * as druid from "@saehrimnir/druidjs";
import AlgorithmStrategy from '../AlgorithmStrategy';

export default class LLE extends AlgorithmStrategy {

    compute(parameters) {
        let data = druid.Matrix.from(parameters.data);
        let metric = this.getMetric(parameters.metric);
        let strategy = new druid.LLE(data, parameters.neighbors, parameters.dimensions, metric);
        let res = strategy.transform().to2dArray;
        let reduced = res.map(e => Array.from(e));
        let header = [];
        for (let i = 0; i < parameters.dimensions; i++) header.push(String("Dimension").concat(i + 1));
        reduced.unshift(header)
        return reduced;
    }
}