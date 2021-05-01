/* eslint-disable class-methods-use-this */
import * as druid from "@saehrimnir/druidjs";
import AlgorithmStrategy from '../AlgorithmStrategy';

export default class UMAP extends AlgorithmStrategy {

    compute(parameters) {
        let data = druid.Matrix.from(parameters.data);
        let strategy = new druid.UMAP(data, parameters.neighbors, 1, 1, parameters.dimensions);
        let res = strategy.transform();
        let reduced = UMAP.get2dArray(res.to2dArray);
        return UMAP.addHeader(reduced, parameters.dimensions);
    }
}