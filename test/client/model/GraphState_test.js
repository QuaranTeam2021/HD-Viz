const {expect} = require('chai');
const {GraphState} = require('../../../client/model/GraphState');
const {ConcreteGraph} = require('../../../client/model/Graph');

describe('Testing GraphState class', function() {

    context('Testing constructor', function() {

        it('Must construct a GraphState object', function() {
            const graph = new ConcreteGraph([], 'Prova');
            const obj = new GraphState(graph, 'FASTMAP', ['feature1', 'feature2', 'feature3']);

            return typeof obj === GraphState;
        })
    })

    context('Testing setGraph', function() {

        it('Must set the graph object', function() {
            const graph = new ConcreteGraph([], 'Prova');
            const obj = new GraphState(graph, 'FASTMAP', ['feature1', 'feature2', 'feature3']);
            const graph2 = new ConcreteGraph([], 'Nuovo');
            obj.setGraph(graph2);

            expect(obj.getGraph()).to.deep.equal(graph2);
        })
    })

    context('Testing setAlgorithm', function() {

        it('Must set the algorithm string', function() {
            const graph = new ConcreteGraph([], 'Prova');
            const obj = new GraphState(graph, 'FASTMAP', []);
            obj.setAlgorithm('LLE');

            expect(obj.getAlgorithm()).to.deep.equal('LLE');
        })
    })

    context('Testing setSelectedFeature', function() {

        it('Must set the selectedFeature array', function() {
            const graph = new ConcreteGraph([], 'Prova');
            const obj = new GraphState(graph, 'FASTMAP', ['old', 'old', 'old']);
            obj.setSelectedFeatures(['new', 'new2', 'new3', 'new4']);

            expect(obj.getSelectedFeatures()).to.deep.equal(['new', 'new2', 'new3', 'new4']);
        })
    })

    context('Testing getGraph', function() {

        it('Must get correct graph' , function() {
            const graph = new ConcreteGraph([], 'Prova');
            const obj = new GraphState(graph, 'FASTMAP', ['old', 'old', 'old']);
            const result = obj.getGraph();

            expect(result).to.deep.equal(graph);
        })
    })

    context('Testing getAlgorithm', function() {

        it('Must get correct algorithm' , function() {
            const graph = new ConcreteGraph([], 'Prova');
            const obj = new GraphState(graph, 'FASTMAP', ['old', 'old', 'old']);
            const result = obj.getAlgorithm();

            expect(result).to.deep.equal('FASTMAP');
        })
    })

    context('Testing getSelectedFeature', function() {

        it('Must get correct selectedFeature' , function() {
            const graph = new ConcreteGraph([], 'Prova');
            const obj = new GraphState(graph, 'FASTMAP', ['old', 'old', 'old']);
            const result = obj.getSelectedFeatures();

            expect(result).to.deep.equal(['old', 'old', 'old']);
        })
    })
})