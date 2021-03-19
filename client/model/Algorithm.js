const druid = require('@saehrimnir/druidjs');

/**
 * @abstract
 * Uso il template method patter
 */
class Algorithm {

    constructor() {}
    
    compute(data, param) {
        let matrix = druid.Matrix.from(data);
        param.metric = this.getMetric(param.metric);
        let red = this.setAlgorithm(matrix, param);
        let res = red.transform();
        return this.get2dArray(res.to2dArray);
    }

    setAlgorithm() {}

    getMetric(metric) {
        let res;
        switch(metric) {
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

    get2dArray(data) {
        let i = 0;
        for (const row of data.values()) {
            data[i] = Array.from(row);
            i++;
        }
        return data;
    }
}

exports.Algorithm = Algorithm;