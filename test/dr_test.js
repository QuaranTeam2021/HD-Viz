const DR = require("../src/dr");
const expect = require("chai").expect;
const math = require("mathjs");
const druid = require('@saehrimnir/druidjs');

describe("Test for dr.js module", function() {

    context("Test for PCA function", function() {
        it("Reduction to 2 dimension", function() {
            const data = [[7,4,3], [4,1,8], [6,3,5], [8,6,1], [8,5,7], [7,2,9], [5,3,3], [9,5,8], [7,4,5], [8,2,2]];
            const actual = DR.PCA(data, 2);
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

        it("Matrix dimensions must be equals", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3]
            ];
            let size = math.size(DR.PCA(input));
            const expected = [5, 2];

            expect(size).to.deep.equal(expected);
        })
    })

    context("Test for getMetric function", function() {
        it("Must return euclidean metric", function() {
            const metric = DR.getMetric('euclidean');

            expect(metric).to.deep.equal(druid.euclidean);
        })

        it("Must return canberra metric", function() {
            const metric = DR.getMetric('canberra');

            expect(metric).to.deep.equal(druid.canberra);
        })

        it("Must return euclidean_squared metric", function() {
            const metric = DR.getMetric('euclidean_squared');

            expect(metric).to.deep.equal(druid.euclidean_squared);
        })

        it("Must return cosine metric", function() {
            const metric = DR.getMetric('cosine');

            expect(metric).to.deep.equal(druid.cosine);
        })

        it("Must return manhattan metric", function() {
            const metric = DR.getMetric('manhattan');

            expect(metric).to.deep.equal(druid.manhattan);
        })
    })

    context("Test for UMAP function", function() {
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
            let output = DR.UMAP(input).to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            }

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

        it("Matrix dimensions must be equals", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3]
            ];
            let size = DR.UMAP(input).shape;
            const expected = [5, 2];

            expect(size).to.deep.equal(expected);
        })

        it("Must use manhattan metric", function() {
            //TODO
        })
        
        it("Must use canberra metric", function() {
            //TODO
        })

        it("Must use cosine metric", function() {
            //TODO
        })

        it("Must use euclidean_squared metric", function() {
            //TODO
        })
    })

    context("Test for FASTMAP function", function() {
        it("Matrix must be equals", function() {
            const input = [
                [ 0, 45,  0, 15,  0, 79,  0, 97,  0, 60,  0, 13,  0, 76,  0, 40,  0, 37, 0, 93,  0, 99,  0, 56,  0, 26,  0, 53,  0, 70 ],
                [ 0,  0,  0, 11,  0, 56,  0, 36,  0, 40,  0, 37,  0, 83,  0, 88,  0, 68, 0, 77,  0, 20,  0, 79,  0, 81,  0,  2,  0, 77 ],
                [ 0, 86,  0, 77,  0, 84,  0, 22,  0, 25,  0,  1,  0, 25,  0, 59,  0, 23, 0, 24,  0, 79,  0, 81,  0, 35,  0, 56,  0, 20 ],
                [ 0, 36,  0, 26,  0, 81,  0, 60,  0, 22,  0, 40,  0, 67,  0, 79,  0, 47, 0, 81,  0, 73,  0, 44,  0, 97,  0, 14,  0, 44 ],
                [ 0, 99,  0, 17,  0, 54,  0,  8,  0,  2,  0, 48,  0, 31,  0, 50,  0, 75, 0, 32,  0, 96,  0, 58,  0, 38,  0, 10,  0, 92 ]
              ];
            let output = DR.FASTMAP(input).to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            }

            let expected = [
                [ 91.49326937559317, 158.94666127930674 ],
                [ 0, 74.88570466673654 ],
                [ 187.23781669310287, 74.88570466673656 ],
                [ 60.79968353112795, 92.38712903927318 ],
                [ 115.38801499385269, 0 ]
            ];

            expect(output).to.deep.equal(expected);
        })

        it("Matrix dimensions must be equals", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3]
            ];
            let size = DR.FASTMAP(input, 3).shape;
            const expected = [5, 3];

            expect(size).to.deep.equal(expected);
        })

        it("Must use manhattan metric", function() {
            //TODO
        })
        
        it("Must use canberra metric", function() {
            //TODO
        })

        it("Must use cosine metric", function() {
            //TODO
        })

        it("Must use euclidean_squared metric", function() {
            //TODO
        })
    })

    context("Test for ISOMAP function", function() {
        it("Matrix must be equals", function() {
            const input = [
                [ 0, 45,  0, 15,  0, 79,  0, 97,  0, 60,  0, 13,  0, 76,  0, 40,  0, 37, 0, 93,  0, 99,  0, 56,  0, 26,  0, 53,  0, 70 ],
                [ 0,  0,  0, 11,  0, 56,  0, 36,  0, 40,  0, 37,  0, 83,  0, 88,  0, 68, 0, 77,  0, 20,  0, 79,  0, 81,  0,  2,  0, 77 ],
                [ 0, 86,  0, 77,  0, 84,  0, 22,  0, 25,  0,  1,  0, 25,  0, 59,  0, 23, 0, 24,  0, 79,  0, 81,  0, 35,  0, 56,  0, 20 ],
                [ 0, 36,  0, 26,  0, 81,  0, 60,  0, 22,  0, 40,  0, 67,  0, 79,  0, 47, 0, 81,  0, 73,  0, 44,  0, 97,  0, 14,  0, 44 ],
                [ 0, 99,  0, 17,  0, 54,  0,  8,  0,  2,  0, 48,  0, 31,  0, 50,  0, 75, 0, 32,  0, 96,  0, 58,  0, 38,  0, 10,  0, 92 ]
              ];
            let output = DR.ISOMAP(input).to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            }

            let expected = [
                [ -0.28881198940283404, 0.03531832445003941 ],
                [ -0.19150815265723092, -0.73105794552124 ],
                [ 0.8625760588643817, 0.13055636652506517 ],
                [ -0.013906328865822028, -0.09658239332855503 ],
                [ -0.3683495879384939, 0.6617656478746887 ]
            ];

            expect(output).to.deep.equal(expected);
        })

        it("Matrix dimensions must be equals", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4]
            ];
            let size = DR.ISOMAP(input, 50, 3).shape;
            const expected = [4, 3];

            expect(size).to.deep.equal(expected);
        })

        it("Must use manhattan metric", function() {
            //TODO
        })
        
        it("Must use canberra metric", function() {
            //TODO
        })

        it("Must use cosine metric", function() {
            //TODO
        })

        it("Must use euclidean_squared metric", function() {
            //TODO
        })
    })

    context("Test for TSNE function", function() {
        it("Matrix must be equals", function() {
            const input = [
                [ 0, 45,  0, 15,  0, 79,  0, 97,  0, 60,  0, 13,  0, 76,  0, 40,  0, 37, 0, 93,  0, 99,  0, 56,  0, 26,  0, 53,  0, 70 ],
                [ 0,  0,  0, 11,  0, 56,  0, 36,  0, 40,  0, 37,  0, 83,  0, 88,  0, 68, 0, 77,  0, 20,  0, 79,  0, 81,  0,  2,  0, 77 ],
                [ 0, 86,  0, 77,  0, 84,  0, 22,  0, 25,  0,  1,  0, 25,  0, 59,  0, 23, 0, 24,  0, 79,  0, 81,  0, 35,  0, 56,  0, 20 ],
                [ 0, 36,  0, 26,  0, 81,  0, 60,  0, 22,  0, 40,  0, 67,  0, 79,  0, 47, 0, 81,  0, 73,  0, 44,  0, 97,  0, 14,  0, 44 ],
                [ 0, 99,  0, 17,  0, 54,  0,  8,  0,  2,  0, 48,  0, 31,  0, 50,  0, 75, 0, 32,  0, 96,  0, 58,  0, 38,  0, 10,  0, 92 ]
              ];
            let output = DR.TSNE(input).to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            }

            let expected = [
              [ 15.880659817504458, -37.05238302530604 ],
              [ 6.202265178693734, 32.72012305434838 ],
              [ -19.58911528456926, -17.371368864252158 ],
              [ 31.216594080067516, 1.4428685517296895 ],
              [ -33.71040379169645, 20.260760283480128 ]
            ];

            expect(output).to.deep.equal(expected);
        })

        it("Matrix dimensions must be equals", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2]
            ];
            let size = DR.TSNE(input, 50, 50, 3).shape;
            const expected = [3, 3];

            expect(size).to.deep.equal(expected);
        })

        it("Must use manhattan metric", function() {
            //TODO
        })
        
        it("Must use canberra metric", function() {
            //TODO
        })

        it("Must use cosine metric", function() {
            //TODO
        })

        it("Must use euclidean_squared metric", function() {
            //TODO
        })
    })

    context("Test for LLE function", function() {
        it("Matrix must be equals", function() {
            const input = [
                [ 0, 45,  0, 15,  0, 79,  0, 97,  0, 60,  0, 13,  0, 76,  0, 40,  0, 37, 0, 93,  0, 99,  0, 56,  0, 26,  0, 53,  0, 70 ],
                [ 0,  0,  0, 11,  0, 56,  0, 36,  0, 40,  0, 37,  0, 83,  0, 88,  0, 68, 0, 77,  0, 20,  0, 79,  0, 81,  0,  2,  0, 77 ],
                [ 0, 86,  0, 77,  0, 84,  0, 22,  0, 25,  0,  1,  0, 25,  0, 59,  0, 23, 0, 24,  0, 79,  0, 81,  0, 35,  0, 56,  0, 20 ],
                [ 0, 36,  0, 26,  0, 81,  0, 60,  0, 22,  0, 40,  0, 67,  0, 79,  0, 47, 0, 81,  0, 73,  0, 44,  0, 97,  0, 14,  0, 44 ],
                [ 0, 99,  0, 17,  0, 54,  0,  8,  0,  2,  0, 48,  0, 31,  0, 50,  0, 75, 0, 32,  0, 96,  0, 58,  0, 38,  0, 10,  0, 92 ]
              ];
            let output = DR.LLE(input).to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            }

            let expected = [
                [ 0.48507125007266594, -0.6662966046527696 ],
                [ 0.48507125007266594, -0.09994449069791546 ],
                [ -0.48507125007266594, -0.4664076232569387 ],
                [ 0.24253562503633297, -0.3331483023263848 ],
                [ -0.48507125007266594, -0.4664076232569387 ]
            ];

            expect(output).to.deep.equal(expected);
        })
        
        it("Matrix dimensions must be equals", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3]
            ];
            let size = DR.LLE(input, 50, 3).shape;
            const expected = [5, 3];

            expect(size).to.deep.equal(expected);
        })

        it("Must use manhattan metric", function() {
            //TODO
        })
        
        it("Must use canberra metric", function() {
            //TODO
        })

        it("Must use cosine metric", function() {
            //TODO
        })

        it("Must use euclidean_squared metric", function() {
            //TODO
        })
    })
}) 