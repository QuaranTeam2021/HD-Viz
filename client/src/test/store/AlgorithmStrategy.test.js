import { describe, expect, test } from '@jest/globals';
import AlgorithmStrategy from '../../store/AlgorithmStrategy';

describe('Testing for abstract class Graph', () => {

    test('Must thrown an error', () => {
        expect(() => {
            let alg = new AlgorithmStrategy();
        }).toThrow("Can't instantiate interface!");
    })
})