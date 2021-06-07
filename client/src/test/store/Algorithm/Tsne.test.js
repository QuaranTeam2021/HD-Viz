import { beforeAll, describe, expect, test } from '@jest/globals';
import TSNE from '../../../store/Algorithm/TSNE';
import TsneParameters from '../../../store/Parameters/TsneParameters';

describe("Testing ISOMAP class", () => {

    let input;

    beforeAll(() => {
        input = [
            [0, 45, 0, 15, 0, 79, 0, 97, 0, 60, 0, 13, 0, 76, 0, 40, 0, 37, 0, 93, 0, 99, 0, 56, 0, 26, 0, 53, 0, 70],
            [0, 0, 0, 11, 0, 56, 0, 36, 0, 40, 0, 37, 0, 83, 0, 88, 0, 68, 0, 77, 0, 20, 0, 79, 0, 81, 0, 2, 0, 77],
            [0, 86, 0, 77, 0, 84, 0, 22, 0, 25, 0, 1, 0, 25, 0, 59, 0, 23, 0, 24, 0, 79, 0, 81, 0, 35, 0, 56, 0, 20],
            [0, 36, 0, 26, 0, 81, 0, 60, 0, 22, 0, 40, 0, 67, 0, 79, 0, 47, 0, 81, 0, 73, 0, 44, 0, 97, 0, 14, 0, 44],
            [0, 99, 0, 17, 0, 54, 0, 8, 0, 2, 0, 48, 0, 31, 0, 50, 0, 75, 0, 32, 0, 96, 0, 58, 0, 38, 0, 10, 0, 92]
        ];
    })

    test("Matrix must be equals", () => {
        const param = new TsneParameters(2, 2, 1, "euclidean", input);
        const output = new TSNE().compute(param);
        const expected = [
            ['Dimension1', 'Dimension2'],
            [7.594857485078024, -3.8857569640866547],
            [-2.056767647869603, -9.054971295983236],
            [-1.5955035472798422, 10.934122319514758],
            [1.0582807124022986, -5.0428854259165945],
            [-5.000867002330877, 7.049491366471728]
        ];
        expect(output).toEqual(expected);
    })

    test("Matrix dimensions must be equals", () => {
        const param = new TsneParameters(2, 2, 1, "euclidean", input);
        const output = new TSNE().compute(param);
        const size = [output.length, output[0].length];
        const expected = [6, 2];
        expect(size).toEqual(expected);
    })

    test("Must return an array", () => {
        const param = new TsneParameters(2, 2, 1, "euclidean", input);
        const output = new TSNE().compute(param);
        expect(output).toBeInstanceOf(Array);
    })
    
    test("Must return an array", () => {
        const param = new TsneParameters(2, 2, 1, "euclidean", input);
        const output = new TSNE().compute(param);
        expect(output).not.toBeUndefined();
    })
})