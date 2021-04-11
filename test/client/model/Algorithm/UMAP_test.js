/* eslint-disable func-names */
const { expect } = require('chai');
const { UMAP } = require('../../../../client/src/model/Algorithm/UMAP');

describe("Testing UMAP class", function() {

    context("Testing results...", function() {

        it("Matrix must be equals", function() {
            const input = [
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3],
                [5.0, 3.4, 1.5, 0.2],
                [4.4, 2.9, 1.4, 0.2],
                [4.9, 3.1, 1.5, 0.1],
                [5.4, 3.7, 1.5, 0.2],
                [4.8, 3.4, 1.6, 0.2]
            ];
            const param = {
                neighbors: 10,
                dims: 2
            }
            
            let output = new UMAP().compute(input, param);

            let expected = [
                [-0.04172346189476262, -0.7409675049529523],
                [1.4132422465138268, -0.9067669012719739],
                [-0.6571233868159524, 1.0647268620286292],
                [-1.0723607996613853, 0.027323122063888733],
                [0.23818311760479532, 2.270151502406776],
                [1.9830868877352936, 0.5271678615513247],
                [1.4126864560817798, 1.792933920688421],
                [1.032239149197377, 0.5110954679805336],
                [0.16656307781258656, 1.364825143350125],
                [0.21691024927569105, -0.08982903801730363]
              ];

            expect(output).to.deep.equal(expected);
        })

        it("Matrix must have same dimension", function() {
            const input = [
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3]
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