const expect = require('chai').expect;
const {UMAP} = require('../../../../client/model/Algorithm/UMAP');

describe("Testing UMAP class", function() {

    context("Testing results...", function() {

        it("Matrix must be equals", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2],
                [4.4,2.9,1.4,0.2],
                [4.9,3.1,1.5,0.1],
                [5.4,3.7,1.5,0.2],
                [4.8,3.4,1.6,0.2]
            ];
            const param = {
                neighbors: 10,
                dims: 2
            }
            
            let output = new UMAP().compute(input, param);

            let expected = [
                [ 1.5937288190270302, -0.47419646937305515 ],
                [ 1.209561151400169, 2.014020037310045 ],
                [ -0.06822000723795697, 0.0034691718914332155 ],
                [ -1.0377853854380448, -0.32736293753448253 ],
                [ -0.15291797737741744, 2.036770559639028 ],
                [ 0.8762331712813386, 0.5080556430513532 ],
                [ 2.08531140337737, 0.9336585087179606 ],
                [ 0.42453309284295115, 0.9981151176604252 ],
                [ -0.9032560477043459, 0.9699407275112585 ],
                [ 0.6645153156780892, -0.8418099230465165 ]
            ];

            expect(output).to.deep.equal(expected);
        })

        it("Matrix must have same dimension", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3]
            ];
            const param = {
                neighbors: 10,
                dims: 2
            }
            const res = new UMAP().compute(input, param);
            const size = [res.length, res[0].length];
            const expected = [5, 2];

            expect(size).to.deep.equal(expected);
        })
    })
})