/* eslint-disable object-property-newline */
import { beforeAll, describe, expect, test } from '@jest/globals';
import IsomapController from '../../controller/IsomapController';
import Store from '../../store/Store';

describe('Testing isomapController', () => {

    let dataTest, isomapController, store;

    beforeAll(() => {
        store = new Store();
        dataTest = [ 
            ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
            [5.1, 3.5, 1.4, 0.2, 'setosa'],
            [4.9, 3, 1.4, 0.2, 'setosa'],
            [4.7, 3.2, 1.3, 0.2, 'setosa'],
            [4.6, 3.1, 1.5, 0.2, 'setosa'],
            [5, 3.6, 1.4, 0.2, 'setosa']
        ];
        isomapController = new IsomapController(store);
    }) 

    beforeEach(() => {
        store.reset();
        store.loadData(dataTest);
        isomapController.dimensions = 2;
        isomapController.neighbors = 10;
        isomapController.metric = 'manhattan';
    })

    describe('Testing createGraph method', () => {

        test('Must not be undefined', () => {
            isomapController.createGraph('testIsomapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs).not.toBeUndefined();
        })

        test('Store must contain 1 graph', () => {
            isomapController.createGraph('testIsomapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs.length).toEqual(1);
        })

        test('Must have correct graphId', () => {
            isomapController.createGraph('testIsomapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].graphId).toEqual('testIsomapId');
        })

        test('Must have correct type', () => {
            isomapController.createGraph('testIsomapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].type).toEqual('scpt');
        })

        test('Must have correct grouper', () => {
            isomapController.createGraph('testIsomapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].grouper).toEqual('species');
        })

        test('Must have correct data', () => {
            isomapController.createGraph('testIsomapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species'], false);
            const graphs = store.graphs;
            const expected = [
                {
                  Dimension1: 0.46481791672372585,
                  Dimension2: 0.04182195346769144,
                  species: 'setosa'
                },
                {
                  Dimension1: 0.007387549970974222,
                  Dimension2: -0.43185012509051696,
                  species: 'setosa'
                },
                {
                  Dimension1: -0.6999666472008651,
                  Dimension2: 0.5324204669771201,
                  species: 'setosa'
                },
                {
                  Dimension1: -0.2521787242928264,
                  Dimension2: -0.580188808293774,
                  species: 'setosa'
                },
                {
                  Dimension1: 0.4799399047989905,
                  Dimension2: 0.4377965129394784,
                  species: 'setosa'
                }
            ];
            expect(graphs[0].data).toEqual(expected);
        })
    })
})