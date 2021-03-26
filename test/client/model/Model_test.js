const {Model} = require('../../../client/src/model/Model');
const {expect} = require('chai');
const {GraphState} = require('../../../client/src/model/GraphState');
const {Data} = require('../../../client/src/model/Data');

describe('Testing model class', function() {

    context('Testing constructor', function() {

        it('Must construct a Model object', function() {
            const d = new Data([1, 2, 3], ['id', 'name', 'surname']);
            const mod = new Model(d, []);

            expect(mod).instanceOf(Model);
        })

        it('Should not be undefined', function() {
            const mod = new Model();

            expect(mod).to.not.be.undefined;
        })
    }) 

    context('Testing setOriginalData', function() {

        it('Must set originalData', function() {
            const d = new Data([['id1', 'id2', 'id3'], [1, 2, 3]]);
            const mod = new Model(d, []);
            const newData = new Data([[8, 9, 3], ['id', 'id2', 'id8']]);
            mod.setOriginalData = newData;

            expect(mod.getOriginalData.getMatrix).to.deep.equal([[8, 9, 3], ['id', 'id2', 'id8']]);
        })

        it('Must set graphs', function() {
            const graph1 = new GraphState('id1', []);
            const graph2 = new GraphState('id2', []);
            const graphs = [graph1, graph2];
            const mod = new Model();
            mod.setGraphs = graphs;

            expect(mod.getGraphs).to.deep.equal([graph1, graph2]);
        })
    }) 

    context('Testing addGraph', function() {

        it('Must add one GraphState in graphs', function() {
            const mod = new Model([], []);
            const graphState = new GraphState('id', []);
            mod.addGraphState(graphState);

            return mod.getGraphs.length === 1;
        })

        it('Must add GraphState in graphs', function() {
            const mod = new Model([], []);
            const graphState = new GraphState('id', []);
            mod.addGraphState(graphState);

            expect(mod.getGraphStateAtIndex(0)).to.deep.equal(graphState);
        })

        it('Must add one GraphState in last position', function() {
            const mod = new Model([], []);
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            mod.addGraphState(graphState);
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);

            expect(mod.getGraphStateAtIndex(2)).to.deep.equal(graphState2);
        })
    }) 

    context('Testing removeGraphStateAtIndex', function() {

        it('Must remove the graphs at the correct index', function() {
            const mod = new Model([], []);
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            mod.addGraphState(graphState);
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);
            mod.removeGraphStateAtIndex(1);

            expect(mod.getGraphStateAtIndex(1)).to.deep.equal(graphState2);
        })
    })

    context('Testing getOriginalData', function() {

        it('Must return originalData', function() {
            const mod = new Model([['id', 'name', 'surname'], [1, 2, 3]], []);

            expect(mod.getOriginalData).to.deep.equal([['id', 'name', 'surname'], [1, 2, 3]]);
        })

        it('Must return a Data object', function() {
            const mod = new Model([['id', 'name', 'surname'], [1, 2, 3]], []);
            const res = mod.getOriginalData;
            return typeof res === Data;
        })
    })

    context('Testing getGraphStateAtIndex', function() {

        it('Must return the GraphState at index', function() {
            const mod = new Model([], []);
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            mod.addGraphState(graphState);
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);
            const result = mod.getGraphStateAtIndex(1);

            expect(result).to.deep.equal(graphState1);
        })

        it('Must return error', function() {
            expect(function() {
                const mod = new Model([], []);
                const graphState = new GraphState('id1');
                const graphState1 = new GraphState('id2');
                const graphState2 = new GraphState('id3');
                mod.addGraphState(graphState);
                mod.addGraphState(graphState1);
                mod.addGraphState(graphState2);
                console.log(mod.getGraphStateAtIndex(4));
            }).to.throw(Error,'Out of bounds...');
        })

        it('Must return error with negative index', function() {
            expect(function() {
                const mod = new Model([], []);
                const graphState = new GraphState('id1');
                const graphState1 = new GraphState('id2');
                const graphState2 = new GraphState('id3');
                mod.addGraphState(graphState);
                mod.addGraphState(graphState1);
                mod.addGraphState(graphState2);
                console.log(mod.getGraphStateAtIndex(-1));
            }).to.throw(Error,'Out of bounds...');
        })

        it('Must return error with empty array', function() {
            expect(function() {
                const mod = new Model([], []);
                console.log(mod.getGraphStateAtIndex(0));
            }).to.throw(Error,'Out of bounds...');
        })
    })

    context('Testing reset method', function() {

        it('Must remove originalData', function() {
            const graphState = new GraphState('id1');
            const mod = new Model([1, 2, 3], [graphState]);
            mod.reset();

            expect(mod.getOriginalData).to.deep.equal([]);
        })

        it('Must remove all GraphState from graphs', function() {
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            const mod = new Model([1, 2, 3], [graphState, graphState1, graphState2]);
            mod.reset();

            return mod.getGraphs.length == 0;
        })

        it('Must remove GraphState from graphs', function() {
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            const mod = new Model([1, 2, 3], [graphState, graphState1, graphState2]);
            mod.reset();

            expect(mod.getGraphs).to.deep.equal([]);
        })
    })

    context('Testing getGraphs method', function() {

        it('Must return graphs array', function() {
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            const mod = new Model([1, 2, 3], [graphState, graphState1, graphState2]);

            expect(mod.getGraphs).to.deep.equal([graphState, graphState1, graphState2]);
        })

        it('Must return empty array', function() {
            const mod = new Model([1, 2, 3], []);

            expect(mod.getGraphs).to.deep.equal([]);
        })
    })
})