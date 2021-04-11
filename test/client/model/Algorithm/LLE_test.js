/* eslint-disable func-names */
const { expect } = require('chai');
const { LLE } = require('../../../../client/src/model/Algorithm/LLE');

describe("Testing LLE class", function() {

    context("Testing compute function", function() {
        it("Matrix must be equals", function() {
            const input = [
                [0, 45, 0, 15, 0, 79, 0, 97, 0, 60, 0, 13, 0, 76, 0, 40, 0, 37, 0, 93, 0, 99, 0, 56, 0, 26, 0, 53, 0, 70],
                [0, 0, 0, 11, 0, 56, 0, 36, 0, 40, 0, 37, 0, 83, 0, 88, 0, 68, 0, 77, 0, 20, 0, 79, 0, 81, 0, 2, 0, 77],
                [0, 86, 0, 77, 0, 84, 0, 22, 0, 25, 0, 1, 0, 25, 0, 59, 0, 23, 0, 24, 0, 79, 0, 81, 0, 35, 0, 56, 0, 20],
                [0, 36, 0, 26, 0, 81, 0, 60, 0, 22, 0, 40, 0, 67, 0, 79, 0, 47, 0, 81, 0, 73, 0, 44, 0, 97, 0, 14, 0, 44],
                [0, 99, 0, 17, 0, 54, 0, 8, 0, 2, 0, 48, 0, 31, 0, 50, 0, 75, 0, 32, 0, 96, 0, 58, 0, 38, 0, 10, 0, 92]
            ];
            const param = {
                neighbors: 10,
                dims: 2,
                metric: "euclidean"
            }
            const output = new LLE().compute(input, param);

            const expected = [
                [0.07197743141570735, -0.7493437421596598],
                [0.6142074147473694, 0.2559063279862143],
                [-0.6190059101750832, -0.25595238122380576],
                [0.3071037073736847, -0.24706410636865855],
                [-0.3742826433616782, 0.4964308746168889]
            ];

            expect(output).to.deep.equal(expected);
        })
        
        it("Matrix dimensions must be equals", function() {
            const input = [
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3]
            ];
            const param = {
                neighbors: 10,
                dims: 3,
                metric: "euclidean"
            }
            const res = new LLE().compute(input, param);

            const size = [res.length, res[0].length];
            const expected = [5, 3];

            expect(size).to.deep.equal(expected);
        })

        it("Must use manhattan metric", function() {
            const input = [
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3],
                [5.0, 3.4, 1.5, 0.2]
            ];
            const param = {
                neighbors: 10,
                dims: 2,
                metric: "manhattan"
            }
            const output = new LLE().compute(input, param);

            const expected = [
                [0.31040992424674757, -0.0820344470168973],
                [0.44227768015367286, -0.3865024161653639],
                [-0.2005458523419432, 0.2172776870710381],
                [-0.7493940882584789, 0.051854644864777075],
                [0.30691893332509274, 0.7218383656983534],
                [-0.10966659712641692, -0.522433831325945]
            ];

            expect(output).to.deep.equal(expected);
        })
        
        it("Must use canberra metric", function() {
            const input = [
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3],
                [5.0, 3.4, 1.5, 0.2]
            ];
            const param = {
                neighbors: 10,
                dims: 2,
                metric: "canberra"
            }
            const output = new LLE().compute(input, param);

            const expected = [
                [0.3366744427635879, -0.03155882114887092],
                [0.37346596262605786, -0.53024806550505],
                [-0.13747156065169766, 0.39226637824701527],
                [-0.7706643390880857, 0.006402579209059898],
                [0.33852899036494855, 0.6062689423675333],
                [-0.14053349601436183, -0.4431310131697392]
            ];

            expect(output).to.deep.equal(expected);
        })

        it("Must use cosine metric", function() {
            const input = [
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3],
                [5.0, 3.4, 1.5, 0.2]
            ];
            const param = {
                neighbors: 10,
                dims: 2,
                metric: "cosine"
            }
            const output = new LLE().compute(input, param);

            const expected = [
                [0.33873968004556576, 0.008986105663348294],
                [0.4025824298577637, -0.5274162075090507],
                [-0.16092184934630568, 0.38392808430909947],
                [-0.7693289059357773, -0.04350577370108381],
                [0.30371655410459114, 0.616552225549171],
                [-0.11478790872694052, -0.4385444343114577]
            ];

            expect(output).to.deep.equal(expected);
        })

        it("Must use euclidean_squared metric", function() {
            const input = [
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3],
                [5.0, 3.4, 1.5, 0.2]
            ];
            const param = {
                neighbors: 10,
                dims: 2,
                metric: "euclidean_squared"
            }
            const output = new LLE().compute(input, param);

            const expected = [
                [0.31042611573415974, -0.08425011101513767],
                [0.4423561044952644, -0.3849977164805811],
                [-0.2005634220545574, 0.21710174751117056],
                [-0.7493848863510998, 0.051962249419731446],
                [0.3068089744677136, 0.7225100424013915],
                [-0.1096428862916395, -0.5223262118548639]
            ];

            expect(output).to.deep.equal(expected);
        })

        it("Must use chebyshev metric", function() {
            const input = [
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3],
                [5.0, 3.4, 1.5, 0.2]
            ];
            const param = {
                neighbors: 10,
                dims: 2,
                metric: "chebyshev"
            }
            const output = new LLE().compute(input, param);

            const expected = [
                [0.32355545811534964, -0.014470133211581722],
                [0.3859524268516018, -0.5363104692919718],
                [-0.1514663958690916, 0.4043564640112104],
                [-0.7626407373686444, -0.003570374168642591],
                [0.34812395181984085, 0.5933579518404102],
                [-0.14352470354855418, -0.44336343917948867]
            ];

            expect(output).to.deep.equal(expected);
        })
    })
})