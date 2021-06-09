/* eslint-disable object-property-newline */
import { beforeAll, describe, expect, test } from '@jest/globals';
import Store from '../../store/Store';
import UmapController from '../../controller/UmapController';

describe('Testing umapController', () => {

    let dataTest, store, umapController;
    
    beforeAll(() => {
        store = new Store();
        umapController = new UmapController(store);
        dataTest = [ 
            ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
            [5.1, 3.5, 1.4, 0.2, 'setosa'],
            [4.9, 3, 1.4, 0.2, 'setosa'],
            [4.7, 3.2, 1.3, 0.2, 'setosa'],
            [4.6, 3.1, 1.5, 0.2, 'setosa'],
            [5, 3.6, 1.4, 0.2, 'setosa']
        ];
    })

    beforeEach(() => {
        store.reset();
        store.loadData(dataTest);
        umapController.dimensions = 3;
        umapController.neighbors = 25;
    })

    describe('Testing createGraph method', () => {

        test('Must not be undefined', () => {
            umapController.createGraph('testUmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs).not.toBeUndefined();
        })

        test('Store must contain 1 graph', () => {
            umapController.createGraph('testUmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs.length).toEqual(1);
        })

        test('Must have correct graphId', () => {
            umapController.createGraph('testUmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].graphId).toEqual('testUmapId');
        })

        test('Must have correct type', () => {
            umapController.createGraph('testUmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].type).toEqual('scpt');
        })

        test('Must have correct grouper', () => {
            umapController.createGraph('testUmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].grouper).toEqual('species');
        })

        test('Must have correct data', () => {
            umapController.createGraph('testUmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species'], false);
            const graphs = store.graphs; 
            const expected = [
                {
                  Dimension1: 0.39819505433801394,
                  Dimension2: 0.6562028224795202,
                  Dimension3: 1.8827640628476332,
                  species: 'setosa'
                },
                {
                  Dimension1: 1.1561957271039136,
                  Dimension2: 1.4041307614342708,
                  Dimension3: 0.5518454136782472,
                  species: 'setosa'
                },
                {
                  Dimension1: 0.8968206991227282,
                  Dimension2: -0.3221927644496516,
                  Dimension3: 0.5645211450318894,
                  species: 'setosa'
                },
                {
                  Dimension1: 0.5390738052059811,
                  Dimension2: 0.6074884219973922,
                  Dimension3: -0.8187187713991236,
                  species: 'setosa'
                },
                {
                  Dimension1: -0.5869296477396944,
                  Dimension2: 0.5954934017223477,
                  Dimension3: 0.5240204359306468,
                  species: 'setosa'
                }
            ];
            expect(graphs[0].data).toEqual(expected);
        })
    })
})