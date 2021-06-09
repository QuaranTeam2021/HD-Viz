/* eslint-disable sort-keys */
/* eslint-disable object-property-newline */
import { beforeAll, describe, expect, test } from '@jest/globals';
import StandardController from '../../controller/StandardController';
import Store from '../../store/Store';

describe('Testing stdCtrl', () => {

    let dataTest, stdCtrl, store;

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
        stdCtrl = new StandardController(store);
    })

    beforeEach(() => {
        store.reset();
        store.loadData(dataTest);
    })

    describe('Testing createGraph method', () => {

        test('Must not be undefined', () => {
            stdCtrl.createGraph('testStdId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs).not.toBeUndefined();
        })

        test('Store must contain 1 graph', () => {
            stdCtrl.createGraph('testStdId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs.length).toEqual(1);
        })

        test('Must have correct graphId', () => {
            stdCtrl.createGraph('testStdId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].graphId).toEqual('testStdId');
        })

        test('Must have correct type', () => {
            stdCtrl.createGraph('testStdId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].type).toEqual('scpt');
        })

        test('Must have correct grouper', () => {
            stdCtrl.createGraph('testStdId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].grouper).toEqual('species');
        })

        test('Must have correct data', () => {
            stdCtrl.createGraph('testStdId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species'], false);
            const graphs = store.graphs;
            const expected = [
                {
                  sepalLength: 5.1,
                  petalLength: 1.4,
                  petalWidth: 0.2,
                  species: 'setosa'
                },
                {
                  sepalLength: 4.9,
                  petalLength: 1.4,
                  petalWidth: 0.2,
                  species: 'setosa'
                },
                {
                  sepalLength: 4.7,
                  petalLength: 1.3,
                  petalWidth: 0.2,
                  species: 'setosa'
                },
                {
                  sepalLength: 4.6,
                  petalLength: 1.5,
                  petalWidth: 0.2,
                  species: 'setosa'
                },
                {
                  sepalLength: 5,
                  petalLength: 1.4,
                  petalWidth: 0.2,
                  species: 'setosa'
                }
            ];
            expect(graphs[0].data).toEqual(expected);
        })
    })
})