/* eslint-disable object-property-newline */
import { describe, expect, jest, test } from '@jest/globals';
import StandardGraphController from '../../controller/StandardGraphController';

jest.mock('../../controller/StandardGraphController');

describe('Testing tsneController', () => {

    describe('Testing setDimesions', () => {

        test('Must not be undefined', () => {
            const stdCtrl = new StandardGraphController();
            stdCtrl.dimensions = 5;
            expect(stdCtrl.dimensions).not.toBeUndefined();
        })

        test('Must set dimensions', () => {
            const stdCtrl = new StandardGraphController();
            stdCtrl.dimensions = 3;
            expect(stdCtrl.dimensions).toEqual(3);
        })
    })
})