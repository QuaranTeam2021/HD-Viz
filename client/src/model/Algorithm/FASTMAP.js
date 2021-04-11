/* eslint-disable class-methods-use-this */
const {Algorithm} = require('../Algorithm');
const druid = require('@saehrimnir/druidjs');

class FASTMAP extends Algorithm {

    setAlgorithm(data, param) {
        return new druid.FASTMAP(data, param.dims, param.metric);
    }
}

exports.FASTMAP = FASTMAP;