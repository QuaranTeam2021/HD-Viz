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

        it("Must return chebyshev metric", function() {
            const metric = DR.getMetric('chebyshev');

            expect(metric).to.deep.equal(druid.chebyshev);
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
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ];
            let output = DR.FASTMAP(input, 2, "manhattan").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            }
            
            let expected = [
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
            let output = DR.FASTMAP(input, 2, "canberra").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            }
            
            let expected = [
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
            let output = DR.FASTMAP(input, 2, "cosine").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            }
            
            let expected = [
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
            let output = DR.FASTMAP(input, 2, "euclidean_squared").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
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
            let output = DR.FASTMAP(input, 2, "chebyshev").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
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
                [ -0.36037456072327195, 0.21868654423024914 ],
                [ -0.4224933757482852, -0.010838470859105137 ],
                [ -0.19317630253626375, -0.6580949426665655 ],
                [ 0.7863350938450937, -0.23182768292592765 ],
                [ 0.18970914516272724, 0.6820745522213485 ]
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
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ];
            let output = DR.ISOMAP(input, 10, 2, "manhattan").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ 0.42237633791655343, 0.146401698309919 ],
                [ 0.45033879521212605, -0.5254869469678651 ],
                [ -0.5434851524079367, 0.35994164600916323 ],
                [ -0.4855337387152535, -0.3556118085059392 ],
                [ 0.2723922506953098, 0.6210777489960942 ],
                [ -0.11608849270080723, -0.24632233784140994 ]
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
            let output = DR.ISOMAP(input, 10, 2, "canberra").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ 0.4654351946324464, 0.11485591606607748 ],
                [ 0.322381124518151, -0.11477430026646675 ],
                [ 0.031105571916123967, 0.029845765518640148 ],
                [ -0.4916295308390544, -0.7361326927308999 ],
                [ -0.6013750878997555, 0.6543416775665472 ],
                [ 0.27408272767208913, 0.05186363384610315 ]
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
            let output = DR.ISOMAP(input, 10, 2, "euclidean_squared").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ 0.34235668171652733, 0.4206797273969691 ],
                [ 0.5018837705272813, -0.31179572852494336 ],
                [ -0.49223157601685347, 0.6116644632143906 ],
                [ -0.47029823042968716, -0.38066742171240264 ],
                [ 0.34237254272654233, 0.10301673682900836 ],
                [ -0.2240831885238138, -0.4428977772030443 ]
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
            let output = DR.ISOMAP(input, 10, 2, "chebyshev").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ 0.17031408339473908, 0.55085483516782 ],
                [ 0.4109558001893438, -0.23169323774786088 ],
                [ -0.602470072930552, 0.47275511933507913 ],
                [ -0.43178883930630063, -0.49464224544335017 ],
                [ 0.5004444392413493, 0.10682585822716378 ],
                [ -0.047455410588580244, -0.4041003295388569 ]
            ];

            expect(output).to.deep.equal(expected);
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
                [ 7.594857485078024, -3.8857569640866547 ],
                [ -2.056767647869603, -9.054971295983236 ],
                [ -1.5955035472798422, 10.934122319514758 ],
                [ 1.0582807124022986, -5.0428854259165945 ],
                [ -5.000867002330877, 7.049491366471728 ]
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
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ];
            let output = DR.TSNE(input, 2, 1, 2, "manhattan").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ -5.315796658300116, -1.4713808599835434 ],
                [ -6.148334953913423, -0.1356331246002131 ],
                [ 4.726755484961529, 0.38434347292362186 ],
                [ 7.269780516345124, 0.5628586746959494 ],
                [ -3.8067825678485656, 0.4257824405212068 ],
                [ 3.27437817875545, 0.2340293964429786 ]
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
            let output = DR.TSNE(input, 2, 1, 2, "canberra").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ -14.038864467695094, -6.665967982802074 ],
                [ -10.613989280572815, -1.6406485863918252 ],
                [ 1.7564113277266138, 1.0706657722778312 ],
                [ 16.8549669597344, 4.101388028557257 ],
                [ 9.630451328862483, 2.537110180770897 ],
                [ -3.588975868055592, 0.5974525875879141 ]
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
            let output = DR.TSNE(input, 2, 1, 2, "cosine").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ -4.736690904389666, -1.1850857480266648 ],
                [ -14.970712016935758, -3.7378542451224033 ],
                [ 1.513221918534369, 0.3743703309310838 ],
                [ 15.99571783196567, 3.9991250021119504 ],
                [ 11.76557113821979, 2.9390665391444877 ],
                [ -9.567107967394403, -2.3896218790384536 ]
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
            let output = DR.TSNE(input, 2, 1, 2, "euclidean_squared").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ -4.888006745108702, -0.4066783665863901 ],
                [ -6.199535787354139, -1.3362804594596474 ],
                [ 4.452350106594553, 0.7793446432255502 ],
                [ 6.830176391161224, 1.3118548203971352 ],
                [ -3.2628598851304815, -1.1003632795934402 ],
                [ 3.0678759198375447, 0.7521226420167924 ]
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
            let output = DR.TSNE(input, 2, 1, 2, "chebyshev").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ -7.211491681571181, -1.5383409531740595 ],
                [ -9.490304969586383, 0.5853236520007582 ],
                [ 7.305292803952931, 1.6974929875016214 ],
                [ 11.31617229590916, 2.498967376546695 ],
                [ -6.528674342380975, -4.549011798745279 ],
                [ 4.609005893676451, 1.305568735870264 ]
            ];

            expect(output).to.deep.equal(expected);
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
                [ 0.07197743141570735, -0.7493437421596598 ],
                [ 0.6142074147473694, 0.2559063279862143 ],
                [ -0.6190059101750832, -0.25595238122380576 ],
                [ 0.3071037073736847, -0.24706410636865855 ],
                [ -0.3742826433616782, 0.4964308746168889 ]
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
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ];
            let output = DR.LLE(input, 10, 2, "manhattan").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ 0.31040992424674757, -0.0820344470168973 ],
                [ 0.44227768015367286, -0.3865024161653639 ],
                [ -0.2005458523419432, 0.2172776870710381 ],
                [ -0.7493940882584789, 0.051854644864777075 ],
                [ 0.30691893332509274, 0.7218383656983534 ],
                [ -0.10966659712641692, -0.522433831325945 ]
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
            let output = DR.LLE(input, 10, 2, "canberra").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ 0.3366744427635879, -0.03155882114887092 ],
                [ 0.37346596262605786, -0.53024806550505 ],
                [ -0.13747156065169766, 0.39226637824701527 ],
                [ -0.7706643390880857, 0.006402579209059898 ],
                [ 0.33852899036494855, 0.6062689423675333 ],
                [ -0.14053349601436183, -0.4431310131697392 ]
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
            let output = DR.LLE(input, 10, 2, "cosine").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ 0.33873968004556576, 0.008986105663348294 ],
                [ 0.4025824298577637, -0.5274162075090507 ],
                [ -0.16092184934630568, 0.38392808430909947 ],
                [ -0.7693289059357773, -0.04350577370108381 ],
                [ 0.30371655410459114, 0.616552225549171 ],
                [ -0.11478790872694052, -0.4385444343114577 ]
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
            let output = DR.LLE(input, 10, 2, "euclidean_squared").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ 0.31042611573415974, -0.08425011101513767 ],
                [ 0.4423561044952644, -0.3849977164805811 ],
                [ -0.2005634220545574, 0.21710174751117056 ],
                [ -0.7493848863510998, 0.051962249419731446 ],
                [ 0.3068089744677136, 0.7225100424013915 ],
                [ -0.1096428862916395, -0.5223262118548639 ]
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
            let output = DR.LLE(input, 10, 2, "chebyshev").to2dArray;
            let i = 0;
            for (const v of output.values()) {
                output[i] = Array.from(v);
                i++;
            } 
            
            let expected = [
                [ 0.32355545811534964, -0.014470133211581722 ],
                [ 0.3859524268516018, -0.5363104692919718 ],
                [ -0.1514663958690916, 0.4043564640112104 ],
                [ -0.7626407373686444, -0.003570374168642591 ],
                [ 0.34812395181984085, 0.5933579518404102 ],
                [ -0.14352470354855418, -0.44336343917948867 ]
            ];

            expect(output).to.deep.equal(expected);
        })
    })
}) 