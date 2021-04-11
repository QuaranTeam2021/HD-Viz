/* eslint-disable func-names */
const { FASTMAP } = require('../../../../client/src/model/Algorithm/FASTMAP');
const druid = require('@saehrimnir/druidjs');
const { expect } = require('chai');

/**
 * Uso una istanza generica di Algorithm per testare le funzioni della classe astratta
 */

describe('Testing Algorithm method with abstact class', function() {

    context('Testing getMetric() method', function() {

        it('Must return canberra metric', function() {
            const expected = druid.canberra;
            const actual = new FASTMAP().getMetric('canberra');

            expect(actual).to.deep.equal(expected);
        })

        it('Must return euclidean metric', function() {
            const expected = druid.euclidean;
            const actual = new FASTMAP().getMetric('euclidean');

            expect(actual).to.deep.equal(expected);
        })

        it('Must return euclidean_squared metric', function() {
            const expected = druid.euclidean_squared;
            const actual = new FASTMAP().getMetric('euclidean_squared');

            expect(actual).to.deep.equal(expected);
        })

        it('Must return chebyshev metric', function() {
            const expected = druid.chebyshev;
            const actual = new FASTMAP().getMetric('chebyshev');

            expect(actual).to.deep.equal(expected);
        })

        it('Must return cosine metric', function() {
            const expected = druid.cosine;
            const actual = new FASTMAP().getMetric('cosine');

            expect(actual).to.deep.equal(expected);
        })

        it('Must return manhattan metric', function() {
            const expected = druid.manhattan;
            const actual = new FASTMAP().getMetric('manhattan');

            expect(actual).to.deep.equal(expected);
        })
    })

    context('Testing get2dArray() method', function() {

        it('Must return an equal array', function() {
            const expected = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
            const m = druid.Matrix.from(expected);
            const actual = new FASTMAP().get2dArray(m.to2dArray);
            expect(actual).to.deep.equal(expected);
        })
    })
})