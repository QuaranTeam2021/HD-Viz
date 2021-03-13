const math = require("mathjs");

const datanull = (data) => {
    const sz=math.size(data);
    if(sz==0){
        throw new TypeError('la matrice deve contenere dei dati');
    }
}

exports.datanull = datanull;
