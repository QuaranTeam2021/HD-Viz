const pr = require("../modules/preprocessing");
const expect = require("chai").expect;

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

