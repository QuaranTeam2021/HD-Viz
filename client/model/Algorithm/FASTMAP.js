const Algorithm = require('../Algorithm');
const druid = require('@saehrimnir/druidjs');

class FASTMAP extends Algorithm.Algorithm {

    constructor() {
        super();
    }

    setAlgorithm(data, param) {
        return new druid.FASTMAP(data, param.dims, param.metric);
    }
}

exports.FASTMAP = FASTMAP;