const fs = require("fs");
const d3 = require("d3");
const DR = require("./dr");
console.log("START")

/** Lettura file e creazione matrice di dati 
 * */
let data = fs.readFileSync('../data_test/iris_dataset.csv', 'utf-8')
            .split('\n');

/** Conversione string => float
 * */
for (let i = 0; i < data.length; i++) {
    data[i] = data[i].split(',').map(x=>+x);
}

/** Calcolo riduzione dimensionale
 *  Possiamo ottente 2 o 3 dimensioni a seconda del grafico scelto
 * */ 
var result = DR.PCA(data);
result = d3.csvFormatRows(result);

console.log("Dati ridotti:\n")
console.log(result.toString());
console.log("\nFINISHED.")

