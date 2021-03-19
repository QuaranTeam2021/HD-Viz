const Algorithm = require('../Algorithm');
const druid = require('@saehrimnir/druidjs');

class LLE extends Algorithm.Algorithm {

    constructor() {
        super();
    }

    setAlgorithm(data, param) {
        return new druid.LLE(data, param.neighbors, param.dims, param.metric);
    }
}

exports.LLE = LLE;