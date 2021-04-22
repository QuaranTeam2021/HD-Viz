/* eslint-disable class-methods-use-this */
import * as druid from "@saehrimnir/druidjs";
import AlgorithmStrategy from '../AlgorithmStrategy';

export default class PCA extends AlgorithmStrategy {

    compute(parameters) {
        let data = druid.Matrix.from(parameters.data);
        let strategy = new druid.ISOMAP(data, parameters.dimensions);
        let res = strategy.transform();
        return this.get2dArray(res.to2dArray);
    }
}