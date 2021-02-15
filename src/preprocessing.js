const math = require("mathjs");


function datanull(data){
    const sz=math.size(data);
    if(sz==0){
        throw new TypeError('la matrice deve contenere dei dati');
    }
}

function norm(data){

    const dim = math.size(data);
    let min = [];
    let max = [];

    // calcolo min e max di ogni colonna
    for (let i = 0; i < dim[1]; i++) {
        min.push(math.min(math.column(data, i)));
        max.push(math.max(math.column(data, i)));
    }

    let temp = [];
    temp = JSON.parse(JSON.stringify(data));
    for (let j = 0; j < dim[1]; j++) {
        for (let i = 0; i < dim[0]; i++) {
            temp[i][j] = (temp[i][j] - min[j]) / (max[j] - min[j]);
        }
    }
    
    return temp;
}

function wasteMatrix(data) {

    const dim = math.size(data);
    // calcolo vettore delle medie
    let mean_vector = [];
    for (let i = 0; i < dim[1]; i++)
        mean_vector[i] = math.mean(math.column(data, i));

    let temp = [];
    temp = JSON.parse(JSON.stringify(data));
    // calcolo vettore degli scarti
    for (let i = 0; i < dim[0]; i++) {
        for (let j = 0; j < dim[1]; j++) {
            temp[i][j] = temp[i][j] - mean_vector[j];
        }
    }

    return math.round(temp, 2);
}

/** data => matrice di dati normalizzati
 * */
function cov(data) {

    const dim = math.size(data);

    const temp = wasteMatrix(data);
    
    // colcolo somma degli scarti al quadrato
    let cov = math.multiply(math.transpose(temp), temp);
    return math.divide(cov, dim[0] - 1);
}

exports.datanull = datanull;
exports.norm = norm;
exports.wasteMatrix = wasteMatrix;
exports.cov = cov;