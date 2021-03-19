const reduction = require('../../../../client/model/Algorithm/FASTMAP');
const druid = require('@saehrimnir/druidjs');
const expect = require('chai').expect;

/**
 * Uso una istanza generica di Algorithm per testare le funzioni della classe astratta
 */

describe('Testing Algorithm method with abstact class', function() {

    context('Testing getMetric() method', function() {

        it('Must return canberra metric', function() {
            const expected = druid.canberra;
            const FASTMAP = new reduction.FASTMAP();
            const actual = FASTMAP.getMetric('canberra');

            expect(actual).to.deep.equal(expected);
        })

        it('Must return euclidean metric', function() {
            const expected = druid.euclidean;
            const FASTMAP = new reduction.FASTMAP();
            const actual = FASTMAP.getMetric('euclidean');

            expect(actual).to.deep.equal(expected);
        })

        it('Must return euclidean_squared metric', function() {
            const expected = druid.euclidean_squared;
            const FASTMAP = new reduction.FASTMAP();
            const actual = FASTMAP.getMetric('euclidean_squared');

            expect(actual).to.deep.equal(expected);
        })

        it('Must return chebyshev metric', function() {
            const expected = druid.chebyshev;
            const FASTMAP = new reduction.FASTMAP();
            const actual = FASTMAP.getMetric('chebyshev');

            expect(actual).to.deep.equal(expected);
        })

        it('Must return cosine metric', function() {
            const expected = druid.cosine;
            const FASTMAP = new reduction.FASTMAP();
            const actual = FASTMAP.getMetric('cosine');

            expect(actual).to.deep.equal(expected);
        })

        it('Must return manhattan metric', function() {
            const expected = druid.manhattan;
            const FASTMAP = new reduction.FASTMAP();
            const actual = FASTMAP.getMetric('manhattan');

            expect(actual).to.deep.equal(expected);
        })
    })

    context('Testing get2dArray() method', function() {

        it('Must return an equal array', function() {
            const expected = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
            const m = druid.Matrix.from(expected);
            const FASTMAP = new reduction.FASTMAP();
            const actual = FASTMAP.get2dArray(m.to2dArray);
            expect(actual).to.deep.equal(expected);
        })
    })
})