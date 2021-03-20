const {Algorithm} = require('../Algorithm');
const druid = require('@saehrimnir/druidjs');

class PCA extends Algorithm {

    constructor() {
        super();
    }

    setAlgorithm(data, param) {
        return new druid.PCA(data, param.dims);
    }
}

exports.PCA = PCA;