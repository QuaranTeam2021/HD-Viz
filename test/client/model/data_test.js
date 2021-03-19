const expect = require('chai').expect;
const dt = require('../../../client/model/data');


describe('Test for data class', function() {

    context('Testing setter function', function() {

        it('Must letruct Data by default', function() {
            let d = new dt.Data();
            return d instanceof dt.Data;
        })

        it('Must letruct Data by parameters', function() {
            let d = new dt.Data([1, 2, 4], [4, 5, 6]);
            return d instanceof dt.Data;
        })

        it('Must set matrix', function() {
            let d = new dt.Data();
            let expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            d.setMatrix(expected);
            expect(d.getMatrix()).to.deep.equal(expected);
        })

        it('Must set features', function() {
            let d = new dt.Data();
            let expected = ["Componente 1", "Componente 2"];
            d.setFeatures(expected);
            expect(d.getFeatures()).to.deep.equal(expected); 
        })
    })

    context('Testing getters function', function() {
        
        it('Must get matrix', function() {
            let expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            let data = new dt.Data(expected);
            let actual = data.getMatrix();
            expect(actual).to.deep.equal(expected);
        })

        it('Must get features', function() {
            let expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            let data = new dt.Data([], expected);
            let actual = data.getFeatures();
            expect(actual).to.deep.equal(expected);
        })

        it('Must get header', function() {
            let expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            let data = new dt.Data(expected);
            let actual = data.getHeader();
            expect(actual).to.deep.equal([1, 2, 3]);
        })

        it('Must get body', function() {
            let expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            let data = new dt.Data(expected);
            let actual = data.getBody();
            expect(actual).to.deep.equal([[4, 5, 6], [7, 8, 9]]);
        })

        it('Must get size', function() {
            let data = new dt.Data([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let actual = data.getSize();
            expect(actual).to.deep.equal([3, 3]);
        })

        it('Must get correct row', function() {
            let data = new dt.Data([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            let actual = data.getRow(1);
            expect(actual).to.deep.equal([4, 5, 6]);
        })

        it('Must get correct col', function() {
            let data = new dt.Data([["id", "nome", "cognome"], [4, 5, 6], [7, 8, 9]], ["id", "nome", "cognome"]);
            let actual = data.getCol("nome");
            expect(actual).to.deep.equal(["nome", 5, 8]);
        })

        it('Must get correct index', function() {
            let data = new dt.Data([], ['nome', 'cognome', 'età', 'lavoro']);
            let actual = data.getFeatureIndex('età');
            expect(actual).to.deep.equal(2);
        })

        it('Must update feature name in features', function() {
            let data = new dt.Data([["id", "nome", "cognome", "sostituire"], [4, 5, 6, 5], [7, 8, 9, 1], [5, 7, 10, 15]], ["id", "nome", "cognome", "sostituire"]);
            data.updateFeatureName("sostituita", "sostituire");
            expect(data.getFeatures()[3]).to.deep.equal("sostituita");
        })

        it('Must update feature name in matrix', function() {
            let data = new dt.Data([["id", "nome", "cognome", "sostituire"], [4, 5, 6, 5], [7, 8, 9, 1], [5, 7, 10, 15]], ["id", "nome", "cognome", "sostituire"]);
            data.updateFeatureName("sostituita", "sostituire");
            expect(data.getHeader()[3]).to.deep.equal("sostituita");
        })

        it('Must remove feature from features', function() {
            let data = new dt.Data([["id", "nome", "cognome", "rimuovere"], [4, 5, 6, 5], [7, 8, 9, 1], [5, 7, 10, 15]], ["id", "nome", "cognome", "rimuovere"]);
            data.removeFeature("rimuovere");
            let expected = ["id", "nome", "cognome"];
            expect(data.getFeatures()).to.deep.equal(expected);
        })

        it('Must remove feature from matrix', function() {
            let data = new dt.Data([["id", "nome", "rimuovere", "cognome"], [4, 5, 6, 5], [7, 8, 9, 1], [5, 7, 10, 15]], ["id", "nome", "rimuovere", "cognome"]);
            data.removeFeature("rimuovere");
            let expected = [["id", "nome", "cognome"], [4, 5, 5], [7, 8, 1], [5, 7, 15]];
            expect(data.getMatrix()).to.deep.equal(expected);
        })
    })
})