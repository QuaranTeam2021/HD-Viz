const pr = require("./preprocessing");
const math = require("mathjs");

/** Se presenti intestazioni colonne e/o colonne di stringhe
 * le elimino
 */

function wipeInput(data) {
  let isData = false;
  /* Se la prima riga sono tutti NaN la elimino*/
  for (let i = 1; i < data[0].length; i++) {
    if(!isNaN(data[0][i])) isData = true;
    if(!isData) data = data.slice(1);
  }
  const colNumber = data[0].length - 1;
  if (isNaN(data[0][colNumber])) {
    for (let i = 0; i < data.length; i++) {
      data[i].pop();
    }
}
 return data;
}

/** data = matrice di dati N-dimensionali
 *  dim = numero di dimensioni a cui si vuole ridurre i dati
 * */
function PCA(data, dim = 2) {  
  data = wipeInput(data);

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