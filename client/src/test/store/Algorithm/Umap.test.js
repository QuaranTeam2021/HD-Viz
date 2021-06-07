import { beforeAll, describe, expect, test } from '@jest/globals';
import UMAP from '../../../store/Algorithm/UMAP';
import UmapParameters from '../../../store/Parameters/UmapParameters';

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
        const inputTest = [
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
        const param = new UmapParameters(2, 10, inputTest);
        const output = new UMAP().compute(param);

        let expected = [
            ['Dimension1', 'Dimension2'],
            [1.5937288190270302, -0.47419646937305515],
            [1.209561151400169, 2.014020037310045],
            [-0.06822000723795697, 0.0034691718914332155],
            [-1.0377853854380448, -0.32736293753448253],
            [-0.15291797737741744, 2.036770559639028],
            [0.8762331712813386, 0.5080556430513532],
            [2.08531140337737, 0.9336585087179606],
            [0.42453309284295115, 0.9981151176604252],
            [-0.9032560477043459, 0.9699407275112585],
            [0.6645153156780892, -0.8418099230465165]
        ];
        expect(output).toEqual(expected);
    })

    test("Matrix dimensions must be equals", () => {
        const param = new UmapParameters(2, 10, input);
        const output = new UMAP().compute(param);
        const size = [output.length, output[0].length];
        const expected = [6, 2];
        expect(size).toEqual(expected);
    })

    test("Must return an array", () => {
        const param = new UmapParameters(2, 10, input);
        const output = new UMAP().compute(param);
        expect(output).toBeInstanceOf(Array);
    })
    
    test("Must return an array", () => {
        const param = new UmapParameters(2, 10, input);
        const output = new UMAP().compute(param);
        expect(output).not.toBeUndefined();
    })
})