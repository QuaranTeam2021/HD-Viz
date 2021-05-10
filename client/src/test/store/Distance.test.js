import * as druid from '@saehrimnir/druidjs';
import {describe, expect, test } from '@jest/globals';
import Distance from '../../store/Distance';

describe('Testing Distance enumeration', () => {

    test('Must return euclidean distance function', () => {
        const actual = Distance.euclidean;
        expect(actual).toBe(druid.euclidean)
    })

    test('Must return euclidean_squared distance function', () => {
        const actual = Distance.euclidean_squared;
        expect(actual).toBe(druid.euclidean_squared)
    })

    test('Must return canberra distance function', () => {
        const actual = Distance.canberra;
        expect(actual).toBe(druid.canberra)
    })

    test('Must return manhattan distance function', () => {
        const actual = Distance.manhattan;
        expect(actual).toBe(druid.manhattan)
    })

    test('Must return cosine distance function', () => {
        const actual = Distance.cosine;
        expect(actual).toBe(druid.cosine)
    })

    test('Must return chebyshev distance function', () => {
        const actual = Distance.chebyshev;
        expect(actual).toBe(druid.chebyshev)
    })
})