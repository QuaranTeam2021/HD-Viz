/* eslint-disable object-property-newline */
import { beforeAll, describe, expect, test } from '@jest/globals';
import Store from '../../store/Store';
import TsneController from '../../controller/TsneController';

describe('Testing tsneController', () => {

    let dataTest, store, tsneController;

    beforeAll(() => {
        store = new Store();
        tsneController = new TsneController(store);
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
        tsneController.dimensions = 2;
        tsneController.perplexity = 50;
        tsneController.epsilon = 30;
        tsneController.metric = 'cosine';
    })

    describe('Testing createGraph method', () => {

        test('Must not be undefined', () => {
            tsneController.createGraph('testTsneId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs).not.toBeUndefined();
        })

        test('Store must contain 1 graph', () => {
            tsneController.createGraph('testTsneId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs.length).toEqual(1);
        })

        test('Must have correct graphId', () => {
            tsneController.createGraph('testTsneId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].graphId).toEqual('testTsneId');
        })

        test('Must have correct type', () => {
            tsneController.createGraph('testTsneId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].type).toEqual('scpt');
        })

        test('Must have correct grouper', () => {
            tsneController.createGraph('testTsneId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].grouper).toEqual('species');
        })

        test('Must have correct data', () => {
            tsneController.createGraph('testTsneId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species'], false);
            const graphs = store.graphs; 
            const expected = [
                {
                  Dimension1: 11.92743616867253,
                  Dimension2: 12.302210323720953,
                  species: 'setosa'
                },
                {
                  Dimension1: 13.674788859473777,
                  Dimension2: -8.452978485929659,
                  species: 'setosa'
                },
                {
                  Dimension1: -8.739704566022665,
                  Dimension2: 18.717589728976684,
                  species: 'setosa'
                },
                {
                  Dimension1: -4.134803485382806,
                  Dimension2: -20.867879479846607,
                  species: 'setosa'
                },
                {
                  Dimension1: -12.72771697674084,
                  Dimension2: -1.6989420869213703,
                  species: 'setosa'
                }
            ];
            expect(graphs[0].data).toEqual(expected);
        })
    })
})