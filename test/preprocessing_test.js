const pr = require("../modules/preprocessing");
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

    context('norm_test', function() {
        it('deve ritornare una matrice normalizzata', function() {
            const data_test = [[7, 4, 3], [4, 1, 8], [6, 3, 5], [8, 6, 1], [8, 5, 7], [7, 2, 9], [5, 3, 3], [9, 5, 8], [7, 4, 5], [8, 2, 2]];
            const expected = [
                [0.6000 ,   0.6000 ,   0.2500],
                [     0  ,       0 ,   0.8750],
                [0.4000  ,  0.4000 ,   0.5000],
                [0.8000  ,  1.0000 ,        0],
                [0.8000  ,  0.8000 ,   0.7500],
                [0.6000  ,  0.2000 ,   1.0000],
                [0.2000  ,  0.4000 ,   0.2500],
                [1.0000  ,  0.8000 ,   0.8750],
                [0.6000  ,  0.6000 ,   0.5000],
                [0.8000  ,  0.2000 ,   0.1250],
            ];
            const actual = pr.norm(data_test);
            expect(math.round(actual, 4)).is.deep.equal(expected);
        })
    })

    context('wasteMatrix_test', function() {
        it('deve ritornare una matrice degli scarti', function() {
            const data_test = [[6, 7, 8], [5, 7, 6], [7, 8, 6], [9, 6, 5], [7, 7, 7]];
            const expected = [[-0.8, 0, 1.6], [-1.8, 0, -0.4], [0.2, 1, -0.4], [2.2, -1, -1.4], [0.2, 0, 0.6]];
            
            expect(pr.wasteMatrix(data_test)).is.deep.equal(expected);
        })
    })

    context("cov_test", function() {
        it("deve ritornare una matrice di covarianza", function() {
            const data_test = [[8, 5, 7, 3, 6, 8], [9, 6, 4, 2, 7, 1], [5, 3, 3, 1, 4, 5], [7, 4, 5, 1, 8, 0]];
            const expected = [
                [2.9167, 2.1667, 1.4167, 1.0833, 1.9167, -1.1667],
                [2.1667, 1.6667, 0.8333, 0.8333, 1.1667, -0.6667],
                [1.4167, 0.8333, 2.9167, 1.2500, 1.0833, 2.8333],
                [1.0833, 0.8333, 1.2500, 0.9167, 0.0833, 2.1667],
                [1.9167, 1.1667, 1.0833, 0.0833, 2.9167, -4.1667],
                [-1.1667, -0.6667, 2.8333, 2.1667, -4.1667, 13.6667]
            ];
            const actual = pr.cov(data_test);
            expect(math.round(actual, 4)).is.deep.equal(expected);
        })
    })
})

