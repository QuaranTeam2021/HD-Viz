const pr = require("./preprocessing");
const math = require("mathjs");
global.fetch = require("node-fetch");

/** data = matrice di dati N-dimensionali
 *  dim = numero di dimensioni a cui si vuole ridurre i dati
 * */
function PCA(data, dim = 2) {
    // Normalizzare i dati
    const B = pr.norm(data); // <= DA CAMBIARE
    
    // Calcolo matrice di covarianza
    const cov = pr.cov(B);
    
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

exports.PCA = PCA;