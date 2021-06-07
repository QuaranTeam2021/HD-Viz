import { describe, expect, test } from '@jest/globals';
import Graph from '../../store/Graph';
import Parameters from '../../store/Parameters';

describe('Testing abstract classes', () => {

    test('Graph constructor must throw an error', () => {
        expect(() => { 
            let g = new Graph() }).toThrowError("Can't instantiate abstract class!");
    })

    test('Parameters constructor must throw an error', () => {
        expect(() => { 
            let g = new Parameters() }).toThrowError("Can't instantiate abstract class!");
    })
})