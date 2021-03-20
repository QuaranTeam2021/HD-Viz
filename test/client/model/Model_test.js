const {Model} = require('../../../client/model/Model');
const {expect} = require('chai');
const {GraphState} = require('../../../client/model/GraphState');
const {Data} = require('../../../client/model/Data');
const {ConcreteGraph, Graph} = require('../../../client/model/Graph');

describe('Testing model class', function() {

    context('Testing constructor', function() {

        it('Must construct a Model object', function() {
            const d = new Data([1, 2, 3], ['id', 'name', 'surname']);
            const mod = new Model(d, []);

            return typeof mod === Model;
        })
    }) 

    context('Testing setOriginalData', function() {

        it('Must construct a Model object', function() {
            const d = new Data([1, 2, 3], ['id', 'name', 'surname']);
            const mod = new Model(d, []);
            const newData = new Data([8, 9, 3], ['id', 'id2', 'id8']);
            mod.setOriginalData(newData)

            expect(mod.getOriginalData()).to.deep.equal(newData);
        })
    }) 

    context('Testing pushGraph', function() {

        it('Must push one GraphState in graphs', function() {
            const mod = new Model([], []);
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            mod.pushGraphState(graphState);

            return mod.getGraphsNumber() === 1;
        })

        it('Must push GraphState in graphs', function() {
            const mod = new Model([], []);
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            mod.pushGraphState(graphState);

            expect(mod.getGraphState()).to.deep.equal(graphState);
        })

        it('Must push one GraphState in last position', function() {
            const mod = new Model([], []);
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState1 = new GraphState(new ConcreteGraph([], 'prova1'), 'ISOMAP', []);
            const graphState2 = new GraphState(new ConcreteGraph([], 'prov2'), 'FASTMAP', []);
            mod.pushGraphState(graphState);
            mod.pushGraphState(graphState1);
            mod.pushGraphState(graphState2);

            expect(mod.getGraphState()).to.deep.equal(graphState2);
        })
    }) 

    context('Testing popGraphState', function() {

        it('Must remove the last element in graphs', function() {
            const mod = new Model([], []);
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState1 = new GraphState(new ConcreteGraph([], 'prova1'), 'ISOMAP', []);
            const graphState2 = new GraphState(new ConcreteGraph([], 'prov2'), 'FASTMAP', []);
            mod.pushGraphState(graphState);
            mod.pushGraphState(graphState1);
            mod.pushGraphState(graphState2);
            mod.popGraphState();

            expect(mod.getGraphState()).to.deep.equal(graphState1);
        })
    })

    context('Testing removeGraphStateAtIndex', function() {

        it('Must remove the graphs at the correct index', function() {
            const mod = new Model([], []);
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState1 = new GraphState(new ConcreteGraph([], 'prova1'), 'ISOMAP', []);
            const graphState2 = new GraphState(new ConcreteGraph([], 'prov2'), 'FASTMAP', []);
            mod.pushGraphState(graphState);
            mod.pushGraphState(graphState1);
            mod.pushGraphState(graphState2);
            mod.removeGraphStateAtIndex(1);

            expect(mod.getGraphState(1)).to.deep.equal(graphState2);
        })
    })

    context('Testing getOriginalData', function() {

        it('Must return originalData', function() {
            const mod = new Model([['id', 'name', 'surname'], [1, 2, 3]], []);

            expect(mod.getOriginalData()).to.deep.equal([['id', 'name', 'surname'], [1, 2, 3]]);
        })

        it('Must return a Data object', function() {
            const mod = new Model([['id', 'name', 'surname'], [1, 2, 3]], []);
            const res = mod.getOriginalData();
            return typeof res === Data;
        })
    })

    context('Testing getGraphState', function() {

        it('Must return the last GraphState', function() {
            const mod = new Model([], []);
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState2 = new GraphState(new ConcreteGraph([], 'prov2'), 'FASTMAP', []);
            mod.pushGraphState(graphState);
            mod.pushGraphState(graphState2);
            const result = mod.getGraphState();

            expect(result).to.deep.equal(graphState2);
        })

        it('Must return the GraphState at index', function() {
            const mod = new Model([], []);
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState2 = new GraphState(new ConcreteGraph([], 'prov2'), 'FASTMAP', []);
            mod.pushGraphState(graphState);
            mod.pushGraphState(graphState2);
            const result = mod.getGraphState(0);

            expect(result).to.deep.equal(graphState);
        })

        it('Must return a GraphState', function() {
            const mod = new Model([], []);
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState2 = new GraphState(new ConcreteGraph([], 'prov2'), 'FASTMAP', []);
            mod.pushGraphState(graphState);
            mod.pushGraphState(graphState2);
            const result = mod.getGraphState(0);

            return result !== null;
        })

        it('Must return undefined', function() {
            const mod = new Model([], []);
            const result = mod.getGraphState();

            return result === undefined;
        })
    })

    context('Testing reset methos', function() {

        it('Must remove originalData', function() {
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const mod = new Model([1, 2, 3], [graphState]);
            mod.reset();

            expect(mod.getOriginalData()).to.deep.equal([]);
        })

        it('Must remove all GraphState from graphs', function() {
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState1 = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState2 = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const mod = new Model([1, 2, 3], [graphState, graphState1, graphState2]);
            mod.reset();

            return mod.getGraphsNumber() == 0;
        })

        it('Must remove GraphState from graphs', function() {
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState1 = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState2 = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const mod = new Model([1, 2, 3], [graphState, graphState1, graphState2]);
            mod.reset();

            expect(mod.getGraphs()).to.deep.equal([]);
        })
    })

    context('Testing getGraphs method', function() {

        it('Must return graphs array', function() {
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState1 = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState2 = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const mod = new Model([1, 2, 3], [graphState, graphState1, graphState2]);

            expect(mod.getGraphs()).to.deep.equal([graphState, graphState1, graphState2]);
        })

        it('Must return empty array', function() {
            const mod = new Model([1, 2, 3], []);

            expect(mod.getGraphs()).to.deep.equal([]);
        })
    })

    context('Testing getGraphAtIndex', function() {

        it('Must return a graph object', function() {
            const ConcreteGraph1 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const ConcreteGraph2 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const GraphState1 = new GraphState(ConcreteGraph1, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            const GraphState2 = new GraphState(ConcreteGraph2, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            let graphs = [];
            graphs.push(GraphState1); graphs.push(GraphState2);
            const mod = new Model([], graphs);
            const result = mod.getGraphAtIndex(0);

            return typeof result === Graph;
        })

        it('Must return the correct graph', function() {
            const ConcreteGraph1 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const ConcreteGraph2 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const GraphState1 = new GraphState(ConcreteGraph1, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            const GraphState2 = new GraphState(ConcreteGraph2, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            let graphs = [];
            graphs.push(GraphState1); graphs.push(GraphState2);
            const mod = new Model([], graphs);
            const result = mod.getGraphAtIndex(1);

            expect(result).to.deep.equal(ConcreteGraph2);
        })
    })

    context('Testing getAlgorithmAtIndex', function() {

        it('Must return a string', function() {
            const ConcreteGraph1 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const ConcreteGraph2 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const GraphState1 = new GraphState(ConcreteGraph1, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            const GraphState2 = new GraphState(ConcreteGraph2, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            let graphs = [];
            graphs.push(GraphState1); graphs.push(GraphState2);
            const mod = new Model([], graphs);
            const result = mod.getAlgorithmAtIndex(0);

            return typeof result === String;
        })

        it('Must return the correct algorithm', function() {
            const ConcreteGraph1 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const ConcreteGraph2 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const GraphState1 = new GraphState(ConcreteGraph1, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            const GraphState2 = new GraphState(ConcreteGraph2, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            let graphs = [];
            graphs.push(GraphState1); graphs.push(GraphState2);
            const mod = new Model([], graphs);
            const result = mod.getAlgorithmAtIndex(1);

            expect(result).to.deep.equal('PCA');
        })
    })

    context('Testing getSelectedFeatureAtIndex', function() {

        it('Must return an array', function() {
            const ConcreteGraph1 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const ConcreteGraph2 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const GraphState1 = new GraphState(ConcreteGraph1, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            const GraphState2 = new GraphState(ConcreteGraph2, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            let graphs = [];
            graphs.push(GraphState1); graphs.push(GraphState2);
            const mod = new Model([], graphs);
            const result = mod.getSelectedFeaturesAtIndex(0);

            return typeof result === Array;
        })

        it('Must return the correct array', function() {
            const ConcreteGraph1 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const ConcreteGraph2 = new ConcreteGraph([1, 2, 3, 4, 5], 'prova');
            const GraphState1 = new GraphState(ConcreteGraph1, 'PCA', ['id', 'id1', 'id2', 'id3', 'id4']);
            const GraphState2 = new GraphState(ConcreteGraph2, 'PCA', ['id3', 'id4', 'id5', 'id6', 'id7']);
            let graphs = [];
            graphs.push(GraphState1); graphs.push(GraphState2);
            const mod = new Model([], graphs);
            const result = mod.getSelectedFeaturesAtIndex(1);

            expect(result).to.deep.equal(['id3', 'id4', 'id5', 'id6', 'id7']);
        })
    })

    context('Testing getGraphsNumber', function() {

        it('Must return the correct graphs number', function() {
            const graphState = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState1 = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const graphState2 = new GraphState(new ConcreteGraph([], 'prova'), 'LLE', []);
            const mod = new Model([1, 2, 3], [graphState, graphState1, graphState2]);

            expect(mod.getGraphsNumber()).to.equal(3);
        })

        it('Must return zero', function() {
            const mod = new Model([1, 2, 3], []);

            expect(mod.getGraphsNumber()).to.equal(0);
        })
    })
})