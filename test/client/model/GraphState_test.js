/* eslint-disable func-names */
const { expect } = require('chai');
const { GraphState } = require('../../../client/src/store/GraphState');

describe('Testing GraphState class', function() {

    context('Testing constructor', function() {

        it('Must construct a GraphState', function() {
            const obj = new GraphState();
            expect(obj).instanceOf(GraphState);
        })

        it('Should not be undefined', function() {
            const obj = new GraphState();
            // eslint-disable-next-line no-unused-expressions
            expect(obj).to.not.be.undefined;
        })
    })  
    
    context('Testing setter method', function() {

        it('Must set _graphId', function() {
            const obj = new GraphState();
            obj.setGraphId = 'id_test';
            expect(obj._graphId).to.deep.equal('id_test');
        })

        it('Must set _dataset', function() {
            const obj = new GraphState();
            obj.setDataset = [[1, 2, 3], [5, 6, 9]];
            expect(obj._dataset).to.deep.equal([[1, 2, 3], [5, 6, 9]]);
        })
    }) 
    
    context('Testing getter method', function() {

        it('Must get _graphId', function() {
            const obj = new GraphState('id_test');
            expect(obj.getGraphId).to.deep.equal('id_test');
        })

        it('Must get _dataset', function() {
            const obj = new GraphState('id_test', [[1, 2, 3], [5, 6, 9]]);
            expect(obj.getDataset).to.deep.equal([[1, 2, 3], [5, 6, 9]]);
        })
    })
})