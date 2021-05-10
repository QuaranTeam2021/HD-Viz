import { describe, expect, test } from '@jest/globals';
import Graph from '../../store/Graph';

describe('Testing for abstract class Graph', () => {

    test('Must thrown an error', () => {
        expect(() => {
            let graph = new Graph();
        }).toThrow("Can't instantiate abstract class!");
    })
})