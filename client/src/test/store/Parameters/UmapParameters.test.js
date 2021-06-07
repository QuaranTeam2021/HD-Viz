import { beforeAll, describe, expect, test } from '@jest/globals';
import UmapParameters from '../../../store/Parameters/UmapParameters';

describe('Testing concrete method of abstract class Graph', () => {

    let data;

    beforeAll(() => {
        data = [
            ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
            [5.1, 3.5, 1.4, 0.2, "setosa"],
            [4.9, 3, 1.4, 0.2, "setosa"],
            [4.7, 3.2, 1.3, 0.2, "setosa"]
        ];
    });

    describe('Testing contructor', () => {

        test('Must not be undefined', () => {
            const param = new UmapParameters(10, 68, data);
            expect(param).not.toBeUndefined();
        })

        test('Must be instance of FastmapParameters', () => {
            const param = new UmapParameters(10, 68, data);
            expect(param).toBeInstanceOf(UmapParameters);
        })

        test('Must pass', () => {
            const param = new UmapParameters(10, 68, data);
            expect(param.dimensions).toEqual(10);
        })

        test('Must pass', () => {
            const param = new UmapParameters(10, 68, data);
            expect(param.neighbors).toEqual(68);
        })

        test('Must pass', () => {
            const param = new UmapParameters(10, 68, data);
            expect(param.data).toEqual(data);
        })
    })

    describe('Testing setters methods', () => {

        test('Must set epsilon', () => {
            const param = new UmapParameters(10, 68, data);
            param.neighbors = 124;
            expect(param.neighbors).toEqual(124);
        })
    })

    describe('Testing getters methods', () => {

        test('Must return metric', () => {
            const param = new UmapParameters(10, 68, data);
            expect(param.neighbors).toEqual(68);
        })
    })
})