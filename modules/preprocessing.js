const math = require("mathjs");

function datanull(data){
    const sz=math.size(data);
    if(sz==0){
        throw new TypeError('la matrice deve contenere dei dati');
    }
}

exports.datanull = datanull;
