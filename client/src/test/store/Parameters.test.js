import { describe, expect, test } from '@jest/globals';
import Parameters from '../../store/Parameters';

describe('Testing for abstract class Graph', () => {

    test('Must thrown an error', () => {
        expect(() => {
            let param = new Parameters();
        }).toThrow("Can't instantiate abstract class!");
    })
})