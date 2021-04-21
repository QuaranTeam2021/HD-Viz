/* eslint-disable class-methods-use-this */
import AlgorithmStrategy from '../AlgorithmStrategy';
import * as druid from "@saehrimnir/druidjs";

export default class UMAP extends AlgorithmStrategy {

    compute(parameters) {
        let data = druid.Matrix.from(parameters.data);
        let strategy = new druid.UMAP(data, parameters.neighbors, 1, 1, parameters.dimensions);
        let res = strategy.transform();
        return this.get2dArray(res.to2dArray);
    }
}