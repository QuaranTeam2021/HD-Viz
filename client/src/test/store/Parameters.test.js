import { describe, expect, jest, test } from '@jest/globals';
import Parameters from '../../store/Parameters';

jest.mock('../../store/Parameters');

describe('Testing concrete method of abstract class Graph', () => {

    let param;

    beforeEach(() => {
        param = new Parameters();
    })

    describe('Testing setters methods', () => {

        test('Must set data', () => {
            param.data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            expect(param.data).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        })

        test('Must set dimensions', () => {
            param.dimensions = 10;
            expect(param.dimensions).toEqual(10);
        })
    })

    describe('Testing getters methods', () => {

        test('Must get data', () => {
            param.data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            const getterResult = param.data;
            expect(getterResult).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        })

        test('Must get dimensions', () => {
            param.dimensions = 10;
            const getterResult = param.dimensions;
            expect(getterResult).toEqual(10);
        })
    })
})