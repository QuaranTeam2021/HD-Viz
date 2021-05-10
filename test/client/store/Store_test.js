/* eslint-disable max-lines */
/* eslint-disable func-names */
const Store= require('../../../client/src/store/Store');
const { expect } = require('chai');
const StandardGraph = require('../../../client/src/store/Graph/StandardGraph');
const Data = require('../../../client/src/store/Data');
const FASTMAP = require('../../../client/src/store/Algorithm/FASTMAP');
const FastmapParameters = require('../../../client/src/store/Parameters/FastmapParameters');
const druid = require('@saehrimnir/druidjs');

describe('Testing store class', function() {

    context('Testing constructor', function() {

        it('Must construct a Store object', function() {
            const store = new Store();

            expect(store).instanceOf(Store);
        })

        it('Should not be undefined', function() {
            const store = new Store();

            // eslint-disable-next-line no-unused-expressions
            expect(store).to.not.be.undefined;
        })
    }) 

    context('Tests for setters', function() {

        it('Must set originalData', function() {
            const store = new Store();
            const data = new Data([[8, 9, 3], ['id', 'id2', 'id8']]);
            store.setOriginalData = data;

            expect(store.originalData.matrix).to.deep.equal([[8, 9, 3], ['id', 'id2', 'id8']]);
        })

        it('Must set graphs', function() {
            const graph1 = new StandardGraph('id1', 'heatmap', []);
            const graph2 = new StandardGraph('id2', 'heatmap', []);
            const graphs = [graph1, graph2];
            const store = new Store();
            store.graphs = graphs;

            expect(store.graphs).to.deep.equal([graph1, graph2]);
        })

        it('Must set features', function() {
            const d = new Data([['id1', 'id2', 'id3'], [1, 2, 3]]);
            const store = new Store();
            store.originalData = d;

            expect(store.features).to.deep.equal(['id1', 'id2', 'id3']);
        })
    }) 

    context('Testing addGraph', function() {

        it('Must add one graph in graphs', function() {
            const store = new Store();
            const graph1 = new StandardGraph('id1', 'heatmap', []);
            store.addGraph(graph1);

            return store.graphs.length === 1;
        })

        it('Must add graph in graphs', function() {
            const store = new Store();
            const graph1 = new StandardGraph('id1', 'heatmap', []);
            store.addGraph(graph1);

            expect(store.getGraphStateAtIndex(0)).to.deep.equal(graph1);
        })

        it('Must add one GraphState in last position', function() {
            const store = new Store();
            const graph1 = new StandardGraph('id1', 'heatmap', []);
            const graph2 = new StandardGraph('id1', 'heatmap', []);
            const graph3 = new StandardGraph('id1', 'heatmap', []);
            store.addGraph(graph1);
            store.addGraph(graph2);
            store.addGraph(graph3);

            expect(store.graphs[2]).to.deep.equal(graph3);
        })
    }) 

    context('Testing getters', function() {

        it('Must return originalData', function() {
            const d = [['id', 'name', 'surname'], [1, 2, 3]];
            const store = new Store();
            store.originalData = d;
            expect(store.originalData).to.deep.equal([['id', 'name', 'surname'], [1, 2, 3]]);
        })

        it('Must return a Data object', function() {
            const store = new Store();
            const res = store.originalData;
            return typeof res === Data;
        })

        it('Must return features', function() {
            const d = [['id', 'name', 'surname'], [1, 2, 3]];
            const store = new Store();
            store.originalData = d;
            expect(store.features).to.deep.equal(['id', 'name', 'surname']);
        })
    })

    context('Testing removeGraph', function() {

        it('Must remove the graphs', function() {
            const store = new Store();
            const graph1 = new StandardGraph('id1', 'heatmap', []);
            const graph2 = new StandardGraph('id1', 'heatmap', []);
            const graph3 = new StandardGraph('id1', 'heatmap', []);
            store.addGraph(graph1);
            store.addGraph(graph3);
            store.addGraph(graph2);

            expect(store.graphs).to.deep.equal([graph1, graph3, graph2]);
        })

        it('Must remove array', function() {
            const store = new Store();
            const graph1 = new StandardGraph('id1', 'heatmap', []);
            const graph2 = new StandardGraph('id1', 'heatmap', []);
            const graph3 = new StandardGraph('id1', 'heatmap', []);
            store.addGraph(graph1);
            store.addGraph(graph3);
            store.addGraph(graph2);
            let res = store.graphs;

            expect(res).to.be.instanceOf(Array);
        })
    })

    context('Testing reset method', function() {

        it('Must remove originalData', function() {
            const graph1 = new StandardGraph('id1', 'heatmap', []);
            const store = new Store();
            store.addGraph(graph1);
            store.reset();

            expect(store.originalData).to.deep.equal(new Data([]));
        })

        it('Must remove all graphs from graphs', function() {
            const graph1 = new StandardGraph('id1', 'heatmap', []);
            const graph2 = new StandardGraph('id2', 'heatmap', []);
            const graph3 = new StandardGraph('id3', 'heatmap', []);
            const store = new Store();
            store.addGraph(graph1);
            store.addGraph(graph2);
            store.addGraph(graph3);
            store.reset();

            expect(store.graphs.length).to.equal(0);
        })
    })

    context('Testing getGraphIndexById', function() {

        it('Must return index 1', function() {
            const graph1 = new StandardGraph('id1', 'heatmap', []);
            const graph2 = new StandardGraph('id2', 'heatmap', []);
            const graph3 = new StandardGraph('id3', 'heatmap', []);
            const store = new Store();
            store.addGraph(graph1);
            store.addGraph(graph2);
            store.addGraph(graph3);
            const actual = store.getGraphIndexById('id2');

            expect(actual).to.deep.equal(1);
        })

        it('Must throw error', function() {
            expect(function() {
                const graph1 = new StandardGraph('id1', 'heatmap', []);
                const graph2 = new StandardGraph('id2', 'heatmap', []);
                const graph3 = new StandardGraph('id3', 'heatmap', []);
                const store = new Store();
                store.addGraph(graph1);
                store.addGraph(graph2);
                store.addGraph(graph3);
                store.getGraphStateIndexById('id4');
            }).to.throw(Error, 'Id grafico non presente');
        })
    })

    context('Testing calculateReduction', function() {

        it('Should not be undefined', function() {
            const store = new Store();
            const d = new Data([
                ['feat1', 'feat2', 'feat3', 'feat4'],
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3],
                [5.0, 3.4, 1.5, 0.2]
            ]);
            store.originalData = d;
            let param = new FastmapParameters(2, d.matrix);
            let strategy = new FASTMAP();
            let res = store.calculateReduction(['feat1', 'feat2', 'feat3'], strategy, param);

            // eslint-disable-next-line no-unused-expressions
            expect(res).to.not.be.undefined;
        })

        it('Must set an array', function() {
            const store = new Store();
            const d = new Data([
                ['feat1', 'feat2', 'feat3', 'feat4'],
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3],
                [5.0, 3.4, 1.5, 0.2]
            ]);
            store.originalData = d;
            let param = new FastmapParameters(2, d.matrix);
            let strategy = new FASTMAP();
            let res = store.calculateReduction(['feat1', 'feat2', 'feat3'], strategy, param);

            expect(res).instanceOf(Array);
        })

        it('Must set the correct reduction array', function() {
            const store = new Store();
            const d = new Data([
                ['feat1', 'feat2', 'feat3', 'feat4'],
                [4.7, 3.2, 1.3, 0.2],
                [4.6, 3.1, 1.5, 0.2],
                [5.0, 3.6, 1.4, 0.2],
                [5.4, 3.9, 1.7, 0.4],
                [4.6, 3.4, 1.4, 0.3],
                [5.0, 3.4, 1.5, 0.2]
            ]);
            store.originalData = d;
            let param = new FastmapParameters(2, d.matrix);
            let strategy = new FASTMAP();
            let res = store.calculateReduction(['feat1', 'feat2', 'feat3', 'feat4'], strategy, param);

            const expected = [
                [-3.458666762269165, 0.027612959089264852],
                [-3.307398289104195, 0.17005252869688292],
                [-3.7334681054722885, -0.10589799733019935],
                [-3.863544525694135, -0.05286586695953013],
                [-3.3513355087302834, -0.12216594029636542],
                [-3.652145505056011, 0.09613527534964193]
            ];

            expect(res).to.deep.equal(expected);
        })
    })

    context('Testing calculateDistanceData', function() {

        it('Testing euclidean distance', function() {
            const store = new Store();
            let data = [
                ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
                [5.1, 3.5, 1.4, 0.2, 'setosa'],
                [4.9, 3, 1.4, 0.2, 'setosa'],
                [4.7, 3.2, 1.3, 0.2, 'setosa'],
                [4.6, 3.1, 1.5, 0.2, 'setosa'],
                [5, 3.6, 1.4, 0.2, 'setosa'],
                [5.4, 3.9, 1.7, 0.4, 'setosa'],
                [4.6, 3.4, 1.4, 0.3, 'setosa'],
                [5, 3.4, 1.5, 0.2, 'setosa']
            ];
            store.originalData = data;

            let actual = store.calculateDistanceData(druid.euclidean, ['sepalLength', 'sepalWidth', 'petalWidth'], 'species');

            let expected;

            expect(actual).to.deep.equal(expected);
        })

        it('Testing euclidean_squared distance', function() {
            const store = new Store();
            let data = [
                ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
                [5.1, 3.5, 1.4, 0.2, 'setosa'],
                [4.9, 3, 1.4, 0.2, 'setosa'],
                [4.7, 3.2, 1.3, 0.2, 'setosa'],
                [4.6, 3.1, 1.5, 0.2, 'setosa'],
                [5, 3.6, 1.4, 0.2, 'setosa'],
                [5.4, 3.9, 1.7, 0.4, 'setosa'],
                [4.6, 3.4, 1.4, 0.3, 'setosa'],
                [5, 3.4, 1.5, 0.2, 'setosa']
            ];
            store.originalData = data;

            let actual = store.calculateDistanceData(druid.euclidean_squared, ['sepalLength', 'sepalWidth', 'petalWidth'], 'species');

            let expected;

            expect(actual).to.deep.equal(expected);
        })

        it('Testing cosine distance', function() {
            const store = new Store();
            let data = [
                ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
                [5.1, 3.5, 1.4, 0.2, 'setosa'],
                [4.9, 3, 1.4, 0.2, 'setosa'],
                [4.7, 3.2, 1.3, 0.2, 'setosa'],
                [4.6, 3.1, 1.5, 0.2, 'setosa'],
                [5, 3.6, 1.4, 0.2, 'setosa'],
                [5.4, 3.9, 1.7, 0.4, 'setosa'],
                [4.6, 3.4, 1.4, 0.3, 'setosa'],
                [5, 3.4, 1.5, 0.2, 'setosa']
            ];
            store.originalData = data;

            let actual = store.calculateDistanceData(druid.cosine, ['sepalLength', 'sepalWidth', 'petalWidth'], 'species');

            let expected;

            expect(actual).to.deep.equal(expected);
        })

        it('Testing manhattan distance', function() {
            const store = new Store();
            let data = [
                ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
                [5.1, 3.5, 1.4, 0.2, 'setosa'],
                [4.9, 3, 1.4, 0.2, 'setosa'],
                [4.7, 3.2, 1.3, 0.2, 'setosa'],
                [4.6, 3.1, 1.5, 0.2, 'setosa'],
                [5, 3.6, 1.4, 0.2, 'setosa'],
                [5.4, 3.9, 1.7, 0.4, 'setosa'],
                [4.6, 3.4, 1.4, 0.3, 'setosa'],
                [5, 3.4, 1.5, 0.2, 'setosa']
            ];
            store.originalData = data;

            let actual = store.calculateDistanceData(druid.manhattan, ['sepalLength', 'sepalWidth', 'petalWidth'], 'species');

            let expected;

            expect(actual).to.deep.equal(expected);
        })

        it('Testing canberra distance', function() {
            const store = new Store();
            let data = [
                ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
                [5.1, 3.5, 1.4, 0.2, 'setosa'],
                [4.9, 3, 1.4, 0.2, 'setosa'],
                [4.7, 3.2, 1.3, 0.2, 'setosa'],
                [4.6, 3.1, 1.5, 0.2, 'setosa'],
                [5, 3.6, 1.4, 0.2, 'setosa'],
                [5.4, 3.9, 1.7, 0.4, 'setosa'],
                [4.6, 3.4, 1.4, 0.3, 'setosa'],
                [5, 3.4, 1.5, 0.2, 'setosa']
            ];
            store.originalData = data;

            let actual = store.calculateDistanceData(druid.canberra, ['sepalLength', 'sepalWidth', 'petalWidth'], 'species');

            let expected;

            expect(actual).to.deep.equal(expected);
        })
    })
})