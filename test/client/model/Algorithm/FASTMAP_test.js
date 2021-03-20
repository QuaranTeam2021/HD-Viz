const {expect} = require('chai');
const {FASTMAP} = require('../../../../client/model/Algorithm/FASTMAP');

describe("Testing FASTMAP class", function() {

    context("Testing compute function", function() {

        it("Matrix must be equals", function() {
            const input = [
                [ 0, 45,  0, 15,  0, 79,  0, 97,  0, 60,  0, 13,  0, 76,  0, 40,  0, 37, 0, 93,  0, 99,  0, 56,  0, 26,  0, 53,  0, 70 ],
                [ 0,  0,  0, 11,  0, 56,  0, 36,  0, 40,  0, 37,  0, 83,  0, 88,  0, 68, 0, 77,  0, 20,  0, 79,  0, 81,  0,  2,  0, 77 ],
                [ 0, 86,  0, 77,  0, 84,  0, 22,  0, 25,  0,  1,  0, 25,  0, 59,  0, 23, 0, 24,  0, 79,  0, 81,  0, 35,  0, 56,  0, 20 ],
                [ 0, 36,  0, 26,  0, 81,  0, 60,  0, 22,  0, 40,  0, 67,  0, 79,  0, 47, 0, 81,  0, 73,  0, 44,  0, 97,  0, 14,  0, 44 ],
                [ 0, 99,  0, 17,  0, 54,  0,  8,  0,  2,  0, 48,  0, 31,  0, 50,  0, 75, 0, 32,  0, 96,  0, 58,  0, 38,  0, 10,  0, 92 ]
            ];
            const param = {
                dims: 2,
                metric: "euclidean"
            }
            const output = new FASTMAP().compute(input, param);

            const expected = [
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
            const param = {
                dims: 3,
                metric: "euclidean"
            }
            const res = new FASTMAP().compute(input, param);
            const size = [res.length, res[0].length];
            const expected = [5, 3];

            expect(size).to.deep.equal(expected);
        })

        it("Must use manhattan metric", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ];
            const param = {
                dims: 2, 
                metric: "manhattan"
            }
            const output = new FASTMAP().compute(input, param);
            
            const expected = [
                [ 0.040000000000000695, NaN ],
                [ 0, 0 ],
                [ 0.8900000000000003, 0.4559605246071202 ],
                [ 2.0000000000000004, 9.130914010443533e-17 ],
                [ 0.3399999999999997, 0.16975153729962078 ],
                [ 0.7000000000000003, NaN ]
            ];

            expect(output).to.deep.equal(expected);
        })
        
        it("Must use canberra metric", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ];
            const param = {
                dims: 2, 
                metric: "canberra"
            }
            const output = new FASTMAP().compute(input, param);
            
            const expected = [
                [ 0, 0.10245677879739995 ],
                [ 0.05046532752652574, 0.0530893786468296 ],
                [ 0.12615389509230684, 0.01773471043070523 ],
                [ 0.6345651466555106, 0.1024567787973998 ],
                [ 0.2595225173293512, 0.24492152825351082 ],
                [ 0.13196096322898007, 0 ]
              ];

            expect(output).to.deep.equal(expected);
        })

        it("Must use cosine metric", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ];
            const param = {
                dims: 2, 
                metric: "cosine"
            }
            const output = new FASTMAP().compute(input, param);
            
            const expected = [
                [ 0.021998756776749246, 0.0400192341499719 ],
                [ 0, 0.008212370516978663 ],
                [ 0.042899023033449384, 0.03456442122032689 ],
                [ 0.039907408928147724, 0 ],
                [ 0.05107983557469343, 0.008212370516978654 ],
                [ 0.012244375207323601, 0.025770447606208165 ]
            ];

            expect(output).to.deep.equal(expected);
        })

        it("Must use euclidean_squared metric", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ];
            const param = {
                dims: 2, 
                metric: "euclidean_squared"
            }
            const output = new FASTMAP().compute(input, param);
            
            const expected = [
                [ 0.16941176470588326, 0 ],
                [ 0, 0 ],
                [ 0.6917647058823534, 0 ],
                [ 1.3600000000000008, 0 ],
                [ 0.32411764705882334, 0 ],
                [ 0.6147058823529415, 0 ]
            ];

            expect(output).to.deep.equal(expected);
        }) 

        it("Must use chebyshev metric", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ];
            const param = {
                dims: 2, 
                metric: "chebyshev"
            }
            const output = new FASTMAP().compute(input, param);
            
            const expected = [
                [ 0.11875000000000038, 0.13004069843317445 ],
                [ 0, 1.1773633234564483e-16 ],
                [ 0.45625000000000016, 0.21832520929606347 ],
                [ 0.8000000000000007, 0 ],
                [ 0.05624999999999986, 0.29467938085315704 ],
                [ 0.34375000000000056, 0.08709147693230948 ]
            ];

            expect(output).to.deep.equal(expected);
        }) 
    })
})