/* eslint-disable func-names */
const { expect } = require('chai');
const { TSNE } = require('../../../../client/src/model/Algorithm/TSNE');

describe("Testing TSNE class", function() {

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
                perplexity: 2,
                epsilon: 1,
                dims: 2
            }
            const output = new TSNE().compute(input, param);

            const expected = [
                [7.594857485078024, -3.8857569640866547],
                [-2.056767647869603, -9.054971295983236],
                [-1.5955035472798422, 10.934122319514758],
                [1.0582807124022986, -5.0428854259165945],
                [-5.000867002330877, 7.049491366471728]
            ];

            expect(output).to.deep.equal(expected);
        })

        it("Matrix dimensions must be equals", function() {
            const input = [
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2]
            ];
            const param = {
                perplexity: 2,
                epsilon: 1,
                dims: 3
            }
            const res = new TSNE().compute(input, param);

            const size = [res.length, res[0].length];
            const expected = [3, 3];

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
                perplexity: 2,
                epsilon: 1,
                dims: 2,
                metric: "manhattan"
            }
            const output = new TSNE().compute(input, param);

            const expected = [
                [-5.315796658300116, -1.4713808599835434],
                [-6.148334953913423, -0.1356331246002131],
                [4.726755484961529, 0.38434347292362186],
                [7.269780516345124, 0.5628586746959494],
                [-3.8067825678485656, 0.4257824405212068],
                [3.27437817875545, 0.2340293964429786]
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
                perplexity: 2,
                epsilon: 1,
                dims: 2,
                metric: "canberra"
            }
            const output = new TSNE().compute(input, param);

            const expected = [
                [-14.038864467695094, -6.665967982802074],
                [-10.613989280572815, -1.6406485863918252],
                [1.7564113277266138, 1.0706657722778312],
                [16.8549669597344, 4.101388028557257],
                [9.630451328862483, 2.537110180770897],
                [-3.588975868055592, 0.5974525875879141]
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
                perplexity: 2,
                epsilon: 1,
                dims: 2,
                metric: "cosine"
            }
            const output = new TSNE().compute(input, param);

            const expected = [
                [-4.736690904389666, -1.1850857480266648],
                [-14.970712016935758, -3.7378542451224033],
                [1.513221918534369, 0.3743703309310838],
                [15.99571783196567, 3.9991250021119504],
                [11.76557113821979, 2.9390665391444877],
                [-9.567107967394403, -2.3896218790384536]
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
                perplexity: 2,
                epsilon: 1,
                dims: 2,
                metric: "euclidean_squared"
            }
            const output = new TSNE().compute(input, param);

            const expected = [
                [-4.888006745108702, -0.4066783665863901],
                [-6.199535787354139, -1.3362804594596474],
                [4.452350106594553, 0.7793446432255502],
                [6.830176391161224, 1.3118548203971352],
                [-3.2628598851304815, -1.1003632795934402],
                [3.0678759198375447, 0.7521226420167924]
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
                perplexity: 2,
                epsilon: 1,
                dims: 2,
                metric: "chebyshev"
            }
            const output = new TSNE().compute(input, param);

            const expected = [
                [-7.211491681571181, -1.5383409531740595],
                [-9.490304969586383, 0.5853236520007582],
                [7.305292803952931, 1.6974929875016214],
                [11.31617229590916, 2.498967376546695],
                [-6.528674342380975, -4.549011798745279],
                [4.609005893676451, 1.305568735870264]
            ];

            expect(output).to.deep.equal(expected);
        })
    })
})