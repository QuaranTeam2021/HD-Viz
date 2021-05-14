/* eslint-disable object-property-newline */
/* eslint-disable sort-keys */
import { describe, expect, test } from '@jest/globals';
import DistanceBasedGraph from '../../store/Graph/DistanceBasedGraph';
import DistanceBasedGraphController from '../../controller/DistanceBasedGraphController';
import DistanceData from '../../store/DistanceData';
import Store from '../../store/Store';

describe('Testing DistanceBasedGraphController', () => {

    const store = new Store();
    const dataTest = [ 
        ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
        [5.1, 3.5, 1.4, 0.2, 'setosa'],
        [4.9, 3, 1.4, 0.2, 'setosa'],
        [4.7, 3.2, 1.3, 0.2, 'setosa'],
        [4.6, 3.1, 1.5, 0.2, 'setosa'],
        [5, 3.6, 1.4, 0.2, 'setosa']
    ];
    const nodes = [
        {
          sepalLength: 5.1,
          petalLength: 1.4,
          petalWidth: 0.2,
          id: 'nodo_1',
          group: 'setosa'
        },
        {
          sepalLength: 4.9,
          petalLength: 1.4,
          petalWidth: 0.2,
          id: 'nodo_2',
          group: 'setosa'
        },
        {
          sepalLength: 4.7,
          petalLength: 1.3,
          petalWidth: 0.2,
          id: 'nodo_3',
          group: 'setosa'
        },
        {
          sepalLength: 4.6,
          petalLength: 1.5,
          petalWidth: 0.2,
          id: 'nodo_4',
          group: 'setosa'
        },
        {
          sepalLength: 5,
          petalLength: 1.4,
          petalWidth: 0.2,
          id: 'nodo_5',
          group: 'setosa'
        }
      ];
      const links = [
        { source: 'nodo_1', target: 'nodo_2', value: 0.1999999999999993 },
        { source: 'nodo_1', target: 'nodo_3', value: 0.4123105625617655 },
        { source: 'nodo_1', target: 'nodo_4', value: 0.5099019513592785 },
        { source: 'nodo_1', target: 'nodo_5', value: 0.09999999999999964 },
        { source: 'nodo_2', target: 'nodo_3', value: 0.22360679774997907 },
        { source: 'nodo_2', target: 'nodo_4', value: 0.31622776601683866 },
        { source: 'nodo_2', target: 'nodo_5', value: 0.09999999999999964 },
        { source: 'nodo_3', target: 'nodo_4', value: 0.22360679774997916 },
        { source: 'nodo_3', target: 'nodo_5', value: 0.3162277660168377 },
        { source: 'nodo_4', target: 'nodo_5', value: 0.4123105625617664 }
      ];
    const controller = new DistanceBasedGraphController(store);   

    describe('Testing createGraph method', () => {

        beforeEach(() => {
            store.reset();
            store.loadData(dataTest)
        }) 

        test('Must not be undefined', () => {
            controller.createGraph('testId', 'forceField', 'euclidean', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs).not.toBeUndefined();
        })

        test('Store must contain 1 graph', () => {
            controller.createGraph('testId', 'forceField', 'euclidean', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs.length).toEqual(1);
        })

        test('Must have correct graphId', () => {
            controller.createGraph('testId', 'forceField', 'euclidean', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].graphId).toEqual('testId');
        })

        test('Must have correct type', () => {
            controller.createGraph('testId', 'forceField', 'euclidean', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].type).toEqual('forceField');
        })

        test('Must have correct grouper', () => {
            controller.createGraph('testId', 'forceField', 'euclidean', ['sepalLength', 'petalLength', 'petalWidth'], 'species');
            const graphs = store.graphs;
            expect(graphs[0].grouper).toEqual('species');
        })

        test('Must have correct data', () => {
            controller.createGraph('testId', 'forceField', 'euclidean', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            const expected = new DistanceData(nodes, links)
            expect(graphs[0].data).toEqual(expected);
        })
    })

    describe('Testing changeDistance method', () => {

        beforeEach(() => {
            store.reset();
            store.loadData(dataTest);
            const graphTest = new DistanceBasedGraph('testId', 'forceField', ['species'], new DistanceData(nodes, links));
            store.addGraph(graphTest);
        })

        test('Must not be undefined', () => {
            controller.changeDistance('testId', ['manhattan'], ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs).not.toBeUndefined();
        })

        test('Store must contain 1 graph', () => {
            controller.changeDistance('testId', ['cosine'], ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs.length).toEqual(1);
        })
  
        test('Must have correct data', () => {
            controller.changeDistance('testId', ['cosine'], ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            const nodeExp = [
                {
                  sepalLength: 5.1,
                  petalLength: 1.4,
                  petalWidth: 0.2,
                  id: 'nodo_1',
                  group: 'setosa'
                },
                {
                  sepalLength: 4.9,
                  petalLength: 1.4,
                  petalWidth: 0.2,
                  id: 'nodo_2',
                  group: 'setosa'
                },
                {
                  sepalLength: 4.7,
                  petalLength: 1.3,
                  petalWidth: 0.2,
                  id: 'nodo_3',
                  group: 'setosa'
                },
                {
                  sepalLength: 4.6,
                  petalLength: 1.5,
                  petalWidth: 0.2,
                  id: 'nodo_4',
                  group: 'setosa'
                },
                {
                  sepalLength: 5,
                  petalLength: 1.4,
                  petalWidth: 0.2,
                  id: 'nodo_5',
                  group: 'setosa'
                }
            ];
            const linksExp = [
                { source: 'nodo_1', target: 'nodo_2', value: 0.010479153729599375 },
                { source: 'nodo_1', target: 'nodo_3', value: 0.0037334904969018355 },
                { source: 'nodo_1', target: 'nodo_4', value: 0.0473976743349866 },
                { source: 'nodo_1', target: 'nodo_5', value: 0.005142549438814706 },
                { source: 'nodo_2', target: 'nodo_3', value: 0.008626106067853604 },
                { source: 'nodo_2', target: 'nodo_4', value: 0.03694408868863787 },
                { source: 'nodo_2', target: 'nodo_5', value: 0.005336604290815666 },
                { source: 'nodo_3', target: 'nodo_4', value: 0.04532827637660326 },
                { source: 'nodo_3', target: 'nodo_5', value: 0.004021287088774651 },
                { source: 'nodo_4', target: 'nodo_5', value: 0.042266090837841275 }
            ];
            const expected = new DistanceData(nodeExp, linksExp);
            expect(graphs[0].data).toEqual(expected);
        })        
    })
})