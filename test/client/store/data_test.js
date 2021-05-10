/* eslint-disable func-names */
const { expect } = require('chai');
const Data = require('../../../client/src/store/data');


describe('Test for Data class', function() {

    context('Testing setter function', function() {

        it('Must construct Data by default', function() {
            let d = new Data();
            expect(d).instanceOf(Data);
        })

        it('Must construct Data by parameters', function() {
            let d = new Data([1, 2, 4], [4, 5, 6]);
            expect(d).instanceOf(Data);
        })

        it('Should not be undefined', function() {
            let d = new Data([1, 2, 4], [4, 5, 6]);
            // eslint-disable-next-line no-unused-expressions
            expect(d).to.not.be.undefined;
        })

        it('Must set matrix', function() {
            let d = new Data();
            let expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            d.setMatrix = expected;
            expect(d.getMatrix).to.deep.equal(expected);
        })
    })

    context('Testing getters function', function() {
        
        it('Must get matrix', function() {
            let data = new Data([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let actual = data.getMatrix;
            expect(actual).to.deep.equal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        })

        it('Must get features', function() {
            let data = new Data([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let actual = data.getFeatures;
            expect(actual).to.deep.equal([1, 2, 3]);
        })

        it('Must get subArray', function() {
            let data = new Data([[1, 2, 3]]);
            let actual = data.getFeatures;
            expect(actual).to.deep.equal([1, 2, 3]);
        })
    })

    context('Testing method', function() {

        it('Must get body', function() {
            let data = new Data([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let actual = data.getBody();
            expect(actual).to.deep.equal([[4, 5, 6], [7, 8, 9]]);
        })

        it('Must get size', function() {
            let data = new Data([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let actual = data.getSize();
            expect(actual).to.deep.equal([3, 3]);
        })

        it('Must get correct row', function() {
            let data = new Data([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let actual = data.getRow(1);
            expect(actual).to.deep.equal([4, 5, 6]);
        })

        it('Must get correct col', function() {
            let data = new Data([["id", "nome", "cognome"], [4, 5, 6], [7, 8, 9]]);
            let actual = data.getCol("nome");
            expect(actual).to.deep.equal(["nome", 5, 8]);
        })

        it('Must get correct index', function() {
            let data = new Data([['nome', 'cognome', 'età', 'lavoro']]);
            let actual = data.getFeatureIndex('età');
            expect(actual).to.deep.equal(2);
        })      

        it('Must remove feature from matrix', function() {
            let data = new Data([["id", "nome", "rimuovere", "cognome"], [4, 5, 6, 5], [7, 8, 9, 1], [5, 7, 10, 15]]);
            data.removeFeature("rimuovere");
            let expected = [["id", "nome", "cognome"], [4, 5, 5], [7, 8, 1], [5, 7, 15]];
            expect(data.getMatrix).to.deep.equal(expected);
        })
    })
})