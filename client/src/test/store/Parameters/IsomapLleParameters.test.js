import { beforeAll, describe, expect, test } from '@jest/globals';
import IsomapLleParameters from '../../../store/Parameters/IsomapLleParameters';

describe('Testing concrete method of abstract class Graph', () => {

    let data;

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
            const param = new IsomapLleParameters(10, 50, 'chebyshev', data);
            expect(param).not.toBeUndefined();
        })

        test('Must be instance of FastmapParameters', () => {
            const param = new IsomapLleParameters(10, 50, 'chebyshev', data);
            expect(param).toBeInstanceOf(IsomapLleParameters);
        })

        test('Must pass', () => {
            const param = new IsomapLleParameters(10, 50, 'chebyshev', data);
            expect(param.dimensions).toEqual(10);
        })

        test('Must pass', () => {
            const param = new IsomapLleParameters(10, 50, 'chebyshev', data);
            expect(param.neighbors).toEqual(50);
        })

        test('Must pass', () => {
            const param = new IsomapLleParameters(10, 50, 'chebyshev', data);
            expect(param.metric).toEqual('chebyshev');
        })

        test('Must pass', () => {
            const param = new IsomapLleParameters(10, 50, 'chebyshev', data);
            expect(param.data).toEqual(data);
        })
    })

    describe('Testing setters methods', () => {

        test('Must set metric', () => {
            const param = new IsomapLleParameters(10, 50, 'chebyshev', data);
            param.metric = 'canberra';
            expect(param.metric).toEqual('canberra');
        })

        test('Must set neighbors', () => {
            const param = new IsomapLleParameters(10, 50, 'chebyshev', data);
            param.neighbors = 110;
            expect(param.neighbors).toEqual(110);
        })
    })

    describe('Testing getters methods', () => {

        test('Must return metric', () => {
            const param = new IsomapLleParameters(10, 50, 'euclidean', data);
            expect(param.metric).toEqual('euclidean');
        })

        test('Must return neighbors', () => {
            const param = new IsomapLleParameters(10, 50, 'chebyshev', data);
            expect(param.neighbors).toEqual(50);
        })
    })
})