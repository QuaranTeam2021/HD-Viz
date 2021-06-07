import { beforeAll, describe, expect, test } from '@jest/globals';
import FastmapParameters from '../../../store/Parameters/FastmapParameters';

let data;

describe('Testing concrete method of abstract class Graph', () => {

    beforeAll(() => {
        data = [
            ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
            [5.1, 3.5, 1.4, 0.2, "setosa"],
            [4.9, 3, 1.4, 0.2, "setosa"],
            [4.7, 3.2, 1.3, 0.2, "setosa"]
        ];
    })

    describe('Testing contructor', () => {

        test('Must not be undefined', () => {
            const param = new FastmapParameters(10, '', data);
            expect(param).not.toBeUndefined();
        })

        test('Must be instance of FastmapParameters', () => {
            const param = new FastmapParameters(10, '', data);
            expect(param).toBeInstanceOf(FastmapParameters);
        })

        test('Must pass', () => {
            const param = new FastmapParameters(10, 'canberra', data);
            expect(param.dimensions).toEqual(10);
        })

        test('Must pass', () => {
            const param = new FastmapParameters(10, 'canberra', data);
            expect(param.metric).toEqual('canberra');
        })

        test('Must pass', () => {
            const param = new FastmapParameters(10, 'canberra', data);
            expect(param.data).toEqual(data);
        })
    })

    describe('Testing setters methods', () => {

        test('Must set metric', () => {
            const param = new FastmapParameters(10, '', data);
            param.metric = 'canberra';
            expect(param.metric).toEqual('canberra');
        })
    })

    describe('Testing getters methods', () => {

        test('Must return metric', () => {
            const param = new FastmapParameters(10, 'euclidean', data);
            expect(param.metric).toEqual('euclidean');
        })
    })
})