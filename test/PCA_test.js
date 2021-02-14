const DR = require("../modules/dr");
const expect = require("chai").expect;
const math = require("mathjs");

describe("PCA_test", function() {

    context("Reduction to two dimension", function() {
        it("Deve ritornare una riduzione a due dimensioni", function() {
            const data = [[7,4,3], [4,1,8], [6,3,5], [8,6,1], [8,5,7], [7,2,9], [5,3,3], [9,5,8], [7,4,5], [8,2,2]];
            const actual = DR.PCA(data, 2);
            // risultato della libreria scikit-learn usando la matrice degli scarti
          /*  const expected = [ 
                [ -2.151422764167562,  -0.173119405672135 ],
                [  3.804182594792151,  -2.887498984307582 ],
                [  0.153213282754469,  -0.986885979021638 ],
                [ -4.706518496197685,   1.301536338447610 ],
                [  1.293757879748686,   2.279126319198993 ],
                [  4.099313296886902,   0.143581404309009 ],
                [ -1.625821482657112,  -2.232082815948650 ],
                [  2.114489863353887,   3.251243297539069 ],
                [ -0.234817200554802,   0.373040311501740 ],
                [ -2.746376973958935,  -1.068940486046415 ]
            ];*/
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