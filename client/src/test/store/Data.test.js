import { describe, expect, test } from '@jest/globals';
import Data from '../../store/Data';

describe('Test for Data class', () => {

        test('Must construct Data by default', () => {
            let d = new Data();
            expect(d).toBeInstanceOf(Data);
        })

        test('Must construct Data by parameters', () => {
            let d = new Data([1, 2, 4], [4, 5, 6]);
            expect(d).toBeInstanceOf(Data);
        })

        test('Should not be undefined', () => {
            let d = new Data([1, 2, 4], [4, 5, 6]);
            expect(d).not.toBeUndefined();
        })

        test('Must set matrix', () => {
            let d = new Data();
            let expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            d.matrix = expected;
            expect(d.matrix).toEqual(expected);
        })

        test('Must get matrix', () => {
            let data = new Data([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let actual = data.matrix;
            expect(actual).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        })

        test('Must get features', () => {
            let data = new Data([['id1', 'id2', 'id3'], [4, 5, 6], [7, 8, 9]]);
            let actual = data.features;
            expect(actual).toEqual(['id1', 'id2', 'id3']);
        })

        test('Must get size', () => {
            let data = new Data([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let actual = data.getSize();
            expect(actual).toEqual([3, 3]);
        })

        test('Must get correct col', () => {
            let data = new Data([["id", "nome", "età"], ["id1", "Matteo", 6], ["id2", "Marco", 9], ["id3", "Federico", 21], ["id4", "Luca", 35], ["id5", "Alice", 94]]);
            let actual = data.getCol("nome");
            expect(actual).toEqual(["nome", "Matteo", "Marco", "Federico", "Luca", "Alice"]);
        })  
})