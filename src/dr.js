const alg = require("./linearalgebra");
const math = require("mathjs");
const druid = require('@saehrimnir/druidjs');

/**
 * @param {*} data = 2d array
 * @param {*} dim = number of dimensions
 */
const PCA = (data, dim = 2) => {  
  // Normalizzare i dati
  const B = alg.norm(data); // <= DA CAMBIARE
  
  // Calcolo matrice di covarianza
  const cov = alg.cov(B);
  
  // Calcolo autovalori e autovettori 
  const ans = math.eigs(cov);
  const eigenvalues = ans.values;
  const eigenvectors = ans.vectors;

  // Clono matrice di autovalori da cui ricavo gli indici 
  let temp = eigenvalues.slice();

  /** 1) Ordino gli autovalori e scelgo le componenti principali
    * 2) Salvo gli autovettori relativi agli autovalori scelti
  * */
  math.sort(eigenvalues, 'desc'); // 1)
  
  let W = [];
  for (let i = 0; i < dim; i++) { // 2)
      let index = temp.indexOf(eigenvalues[i]);
      W[i] = math.column(eigenvectors, index);
      W[i] = math.squeeze(W[i]);
  }

  // Formo le componenti principali
  const CP = math.multiply(W, math.transpose(B));
  return math.transpose(CP);
}

/**
 * @param {data} = 2d array
 */

const UMAP = (data) => {
  const matrix = druid.Matrix.from(data);
  const umap = new druid.UMAP(matrix);
  const projection = umap.transform();

  return projection;
}

/**
 * @param {*} data = 2d array 
 * @param {*} d = the number of dimensions, default 2
 * @param {*} metric = distance metric (euclidean, manhattan, cosine, canberra, chebyshev, euclidean_square)
 */
const FASTMAP = (data, d = 2, metric = "euclidean") => {
  let matrix = druid.Matrix.from(data);
  const druidMetric = getMetric(metric);
  const fastmap = new druid.FASTMAP(matrix, d, druidMetric);
  const projection = fastmap.transform();

  return projection;
}

/**
 * @param {*} data = 2d array 
 * @param {*} neighbors = the number of neighbors, between 10 to 300
 * @param {*} d = the number of dimensions, default 2
 * @param {*} metric = distance metric (euclidean, manhattan, canberra, chebyshev, euclidean_square)
 */
const ISOMAP = (data, neighbors = 10, d = 2, metric = "euclidean") => {
  let matrix = druid.Matrix.from(data);
  const druidMetric = getMetric(metric);
  const isomap = new druid.ISOMAP(matrix, neighbors, d, druidMetric);
  const projection = isomap.transform();

  return projection;
}

/**
 * @param {*} data 2d array 
 * @param {*} perplexity between 2 to 100
 * @param {*} epsilon between 1 to 100
 * @param {*} d = the number of dimensions, default 2
 * @param {*} metric = distance metric (euclidean, manhattan, cosine, canberra, chebyshev, euclidean_square)
 */
const TSNE = (data, perplexity = 2, epsilon = 1, d = 2, metric = "euclidean") => {
  let matrix = druid.Matrix.from(data);
  const druidMetric = getMetric(metric);
  const tsne = new druid.TSNE(matrix, perplexity, epsilon, d, druidMetric);
  const projection = tsne.transform();

  return projection;
}

/**
 * @param {*} data = 2d array 
 * @param {*} neighbors = the number of neighbors, between 10 to 300
 * @param {*} d = the number of dimensions, default 2
 * @param {*} metric = distance metric (euclidean, manhattan, cosine, canberra, chebyshev, euclidean_square)
 */
const LLE = (data, neigthbors = 10, d = 2, metric = "euclidean") => {
  let matrix = druid.Matrix.from(data);
  const druidMetric = getMetric(metric);
  const lle = new druid.LLE(matrix, neigthbors, d, druidMetric);
  const projection = lle.transform();

  return projection;
}

const getMetric = (value) => {
  let res;
  switch(value) {
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

exports.getMetric = getMetric;
exports.PCA = PCA;
exports.UMAP = UMAP;
exports.FASTMAP = FASTMAP;
exports.ISOMAP = ISOMAP;
exports.TSNE = TSNE;
exports.LLE = LLE;