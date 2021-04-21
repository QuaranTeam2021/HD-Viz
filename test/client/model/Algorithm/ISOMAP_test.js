/* eslint-disable func-names */
const { expect } = require('chai');
const { ISOMAP } = require('../../../../client/src/store/Algorithm/ISOMAP');

describe("Testing ISOMAP class", function() {

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
                dims: 2
            }
            const output = new ISOMAP().compute(input, param);

            const expected = [
                [-0.36037456072327195, 0.21868654423024914],
                [-0.4224933757482852, -0.010838470859105137],
                [-0.19317630253626375, -0.6580949426665655],
                [0.7863350938450937, -0.23182768292592765],
                [0.18970914516272724, 0.6820745522213485]
            ];

            expect(output).to.deep.equal(expected);
        })

        it("Matrix dimensions must be equals", function() {
            const input = [
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4]
            ];
            const param = {
                neighbors: 10,
                dims: 3
            }
            const res = new ISOMAP().compute(input, param);
            const size = [res.length, res[0].length];
            const expected = [4, 3];

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
            const output = new ISOMAP().compute(input, param);

            const expected = [
                [0.42237633791655343, 0.146401698309919],
                [0.45033879521212605, -0.5254869469678651],
                [-0.5434851524079367, 0.35994164600916323],
                [-0.4855337387152535, -0.3556118085059392],
                [0.2723922506953098, 0.6210777489960942],
                [-0.11608849270080723, -0.24632233784140994]
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
            const output = new ISOMAP().compute(input, param);

            const expected = [
                [0.4654351946324464, 0.11485591606607748],
                [0.322381124518151, -0.11477430026646675],
                [0.031105571916123967, 0.029845765518640148],
                [-0.4916295308390544, -0.7361326927308999],
                [-0.6013750878997555, 0.6543416775665472],
                [0.27408272767208913, 0.05186363384610315]
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
            const output = new ISOMAP().compute(input, param);

            const expected = [
                [0.34235668171652733, 0.4206797273969691],
                [0.5018837705272813, -0.31179572852494336],
                [-0.49223157601685347, 0.6116644632143906],
                [-0.47029823042968716, -0.38066742171240264],
                [0.34237254272654233, 0.10301673682900836],
                [-0.2240831885238138, -0.4428977772030443]
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
            const output = new ISOMAP().compute(input, param);

            const expected = [
                [0.17031408339473908, 0.55085483516782],
                [0.4109558001893438, -0.23169323774786088],
                [-0.602470072930552, 0.47275511933507913],
                [-0.43178883930630063, -0.49464224544335017],
                [0.5004444392413493, 0.10682585822716378],
                [-0.047455410588580244, -0.4041003295388569]
            ];

            expect(output).to.deep.equal(expected);
        })
    })
})