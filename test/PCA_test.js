const DR = require("../modules/dr");
const expect = require("chai").expect;
const math = require("mathjs");

describe("PCA_test", function() {

    context("Reduction to two dimension", function() {
        it("Deve ritornare una riduzione a due dimensioni", function() {
            const data = [[7,4,3], [4,1,8], [6,3,5], [8,6,1], [8,5,7], [7,2,9], [5,3,3], [9,5,8], [7,4,5], [8,2,2]];
            const actual = DR.PCA(data, 2);
            // risultato della libreria scikit-learn usando la matrice degli scarti
            const expected = [
                [ 0.6147, 0.6343 ],
                [ -0.4289, 0.7499 ],
                [ 0.2464, 0.7086 ],
                [ 1.1157, 0.6099 ],
                [ 0.6153, 1.2029 ],
                [ -0.0186, 1.1775 ],
                [ 0.256, 0.4041 ],
                [ 0.6669, 1.4002 ],
                [ 0.4921, 0.8486 ],
                [ 0.5232, 0.5179 ]
              ];
            expect(math.round(actual, 4)).to.deep.equal(expected);
        })
    })

    context("Reduction to three dimension", function() {
        it("Deve ritornare una riduzione a tre dimensioni", function() {
        })
    })
}) 