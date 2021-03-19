const Algorithm = require('../Algorithm');
const druid = require('@saehrimnir/druidjs');

class ISOMAP extends Algorithm.Algorithm {

    constructor() {
        super();
    }

    setAlgorithm(data, param) {
        return new druid.ISOMAP(data, param.neighbors, param.dims, param.metric);
    }
}

exports.ISOMAP = ISOMAP;