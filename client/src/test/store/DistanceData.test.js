import { beforeAll, describe, expect, test } from '@jest/globals';
import DistanceData from '../../store/DistanceData';

describe('Testing for DistanceData class', () => {

    let links, nodes;

    beforeAll(() => {
        nodes = [1, 2, 3, 4, 5, 6];
        links = [4, 5, 6, 7, 8, 9];
    }) 

    describe('Testing constructor', () => {

        test('Must construct a DistanceData by default parameters', () => {
            const data = new DistanceData();
            expect(data).toBeInstanceOf(DistanceData);
        })

        test('Must not be undefined', () => {
            const data = new DistanceData();
            expect(data).not.toBeUndefined();
        })

        test('Must construct a DistanceData', () => {
            const data = new DistanceData(nodes, links);
            expect(data).toBeInstanceOf(DistanceData);
        })
    })

    describe('Testing setters methods', () => {

        test('Must set correct nodes', () => {
            const data = new DistanceData();
            data.nodes = [1, 2, 3, 4, 5, 6];
            expect(data.nodes).toEqual([1, 2, 3, 4, 5, 6]);
        })

        test('Must set correct links', () => {
            const data = new DistanceData();
            data.links = [4, 5, 6, 7, 8, 9];
            expect(data.links).toEqual([4, 5, 6, 7, 8, 9]);
        })

        test('Nodes must be an array', () => {
            const data = new DistanceData();
            data.nodes = [1, 2, 3, 4, 5, 6];
            expect(data.nodes).toBeInstanceOf(Array);
        })

        test('Links must be an array', () => {
            const data = new DistanceData();
            data.links = [4, 5, 6, 7, 8, 9];
            expect(data.links).toBeInstanceOf(Array);
        })
    })

    describe('Testing getters methods', () => {

        test('Must get correct nodes', () => {
            const data = new DistanceData(nodes, links);
            const getterResult = data.nodes;
            expect(getterResult).toEqual([1, 2, 3, 4, 5, 6]);
        })

        test('Must get correct links', () => {
            const data = new DistanceData(nodes, links);
            const getterResult = data.links;
            expect(getterResult).toEqual([4, 5, 6, 7, 8, 9]);
        })

        test('Nodes must be an array', () => {
            const data = new DistanceData(nodes, links);
            const getterResult = data.nodes;
            expect(getterResult).toBeInstanceOf(Array);
        })

        test('Links must be an array', () => {
            const data = new DistanceData(nodes, links);
            const getterResult = data.links;
            expect(getterResult).toBeInstanceOf(Array);
        })
    })
})


