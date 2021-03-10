const math = require("mathjs");

function datanull(data){
    const sz=math.size(data);
    if(sz==0){
        throw new TypeError('la matrice deve contenere dei dati');
    }
}

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

exports.datanull = datanull;
exports.wipeInput = wipeInput;
