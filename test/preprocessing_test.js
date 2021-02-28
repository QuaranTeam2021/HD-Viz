const pr = require("../src/preprocessing");
const expect = require("chai").expect;
const math = require("mathjs");

/** I test verificano il funzionamento atteso di 
 * - norm();
 * - wasteMatrix();
 * - covMatrix();
 */

describe('funzioni_preprocessing_test', function() {

    context('dataset non valido', function() {
        it('deve ritornare un errore in presenza di dati nulli', function() {
            expect(function(){
                const data=[]; 
                pr.datanull(data);
            }).to.throw(TypeError,'la matrice deve contenere dei dati')
        })
    })
})

