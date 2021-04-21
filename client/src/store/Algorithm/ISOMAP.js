/* eslint-disable class-methods-use-this */
const {Algorithm} = require('../Algorithm');
const druid = require('@saehrimnir/druidjs');

class ISOMAP extends Algorithm {

    setAlgorithm(data, param) {
        return new druid.ISOMAP(data, param.neighbors, param.dims, param.metric);
    }
}

exports.ISOMAP = ISOMAP;