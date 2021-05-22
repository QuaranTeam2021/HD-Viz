import { describe, expect, jest, test } from '@jest/globals';
import DatabaseTablesController from '../../controller/DatabaseTablesController';
import Store from '../../store/Store';

const dbTablesCtrl = new DatabaseTablesController(new Store());

global.fetch = jest.fn(() => {
    Promise.resolve({
        json: () => Promise.resolve({ tableName: 'fakeTable' })
    });
})

const errorSpy = jest.spyOn(console, 'error');

describe('Testing DatabaseTableController', () => {

    beforeEach(() => {
        fetch.mockClear();
        errorSpy.mockClear();
    })

    describe('Testing getTablesName method', () => {

        test('fetch must be called 1 time', () => {
            dbTablesCtrl.getTablesNames();
            expect(fetch).toBeCalledTimes(1);
        })

        test('fetch must be called correctly', () => {
            dbTablesCtrl.getTablesNames();
            expect(fetch).toBeCalledWith("http://localhost:5000/api/tableslist", {
                headers: { "authorization": "Bearer " }
            });
        })

        test('fetch must return correct table', async () => {
            let res = await dbTablesCtrl.getTablesNames();
            expect(res).toEqual(['fakeTable']);
        })
    })

   // describe('Testing getTableColumnsNames method', () => {})
})