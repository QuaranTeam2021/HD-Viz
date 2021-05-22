import { describe, expect, jest, test } from '@jest/globals';
import DatabaseLoaderController from '../../controller/DatabaseLoaderController';
import Store from '../../store/Store';

const dbLoaderCtrl = new DatabaseLoaderController(new Store());
global.fetch = jest.fn(() => {
    Promise.resolve({
        json: () => Promise.resolve({ tableName: 'iris_dataset' })
    });
})
const errorSpy = jest.spyOn(console, 'error');

describe('Testing DatabaseLoaderController', () => {

    beforeEach(() => {
        fetch.mockClear();
        errorSpy.mockReset();
    });

    describe('Testing loadTable method', () => {

        test('Fetch must be called 1 times', () => {
            dbLoaderCtrl.loadTable('iris_dataset');
            expect(fetch).toHaveBeenCalledTimes(1);
        })

        test('Fetch must be called with correct value', () => {
            dbLoaderCtrl.loadTable('iris_dataset');
            expect(fetch).toBeCalledWith(`http://localhost:5000/api/getcontent/iris_dataset`, {"headers": {"authorization": "Bearer "}});
        })
    })

    describe('Testing loadTableCols method', () => {

        test('Fetch must be called 1 times', () => {
            dbLoaderCtrl.loadTableCols('iris_dataset', ['sepalLength', 'sepalWidth']);
            expect(fetch).toBeCalledTimes(1);
        })

        test('Must print error if arg1 is not string', () => {
            dbLoaderCtrl.loadTableCols(7, ['sepalLength', 'sepalWidth']);
            expect(errorSpy).toBeCalledTimes(1);
            expect(errorSpy).toBeCalledWith({ error: "select table name and features" });
        })

        test('Must print error if arg2 is not an Array', () => {
            dbLoaderCtrl.loadTableCols('iris_dataset', 'sepalLength');
            expect(errorSpy).toBeCalledTimes(1);
            expect(errorSpy).toBeCalledWith({ error: "select table name and features" });
        })
    })
})