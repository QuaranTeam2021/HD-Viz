/* eslint-disable class-methods-use-this */
const {Algorithm} = require('../Algorithm');
const druid = require('@saehrimnir/druidjs');

class PCA extends Algorithm {

    setAlgorithm(data, param) {
        return new druid.PCA(data, param.dims);
    }
}

exports.PCA = PCA;