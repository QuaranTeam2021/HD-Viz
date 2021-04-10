/* eslint-disable class-methods-use-this */
const {Algorithm} = require('../Algorithm');
const druid = require('@saehrimnir/druidjs');

class UMAP extends Algorithm {

    setAlgorithm(data, param) {
        return new druid.UMAP(data, param.neighbors, 1, 1, param.dims);
    }
}

exports.UMAP = UMAP;