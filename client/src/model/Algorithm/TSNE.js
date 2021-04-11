/* eslint-disable class-methods-use-this */
const {Algorithm} = require('../Algorithm');
const druid = require('@saehrimnir/druidjs');

class TSNE extends Algorithm {

    setAlgorithm(data, param) {
        return new druid.TSNE(data, param.perplexity, param.epsilon, param.dims, param.metric);
    }
}

exports.TSNE = TSNE;