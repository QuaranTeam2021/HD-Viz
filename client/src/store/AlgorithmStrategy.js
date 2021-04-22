/* eslint-disable class-methods-use-this */
import * as druid from "@saehrimnir/druidjs";

export default class AlgorithmStrategy {

    constructor() {
        if (this.constructor === AlgorithmStrategy) 
            throw new Error("Can't instantiate abstract class!");
    }

    compute() {
        // astratto
    }

    getMetric(metric) {
        let res;
        switch (metric) {
            case "euclidean": res = druid.euclidean;
            break;
            case "manhattan": res = druid.manhattan;
            break;
            case "cosine": res = druid.cosine;
            break;
            case "euclidean_squared": res = druid.euclidean_squared;
            break;
            case "canberra": res = druid.canberra;
            break;
            case "chebyshev": res = druid.chebyshev;
            break;
            default: res = druid.euclidean;
            break;
        }
        return res;
    }

    static get2dArray(data) {
        let i = 0;
        for (const row of data.values()) {
            data[i] = Array.from(row);
            i = i + 1;
        }
        return data;
    }
}