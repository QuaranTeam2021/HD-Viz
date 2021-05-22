import { describe, expect, jest, test } from '@jest/globals';
import DatabaseManagerController from '../../controller/DatabaseManagerController';
import Store from '../../store/Store';

const dbManagerCtrl = new DatabaseManagerController(new Store());

global.fetch = jest.fn(() => {
    Promise.resolve({
        json: () => Promise.resolve({ tableName: 'iris_dataset' })
    });
})

const errorSpy = jest.spyOn(console, 'error');

const fileCsv = new File([['fakeData', 1].toString()], 'iris_dataset.csv', { type: 'text/csv' });

describe('Testing DatabaseManagerController', () => {

    beforeEach(() => {
        fetch.mockClear();
        errorSpy.mockReset();
    });

    describe('Testing upload method', () => {

        test('Fetch must be called 1 times', () => {
            dbManagerCtrl.upload('iris_dataset', fileCsv);
            expect(fetch).toBeCalledTimes(1);
        })

        test('Fetch must not be called', () => {
            const emptyFile = new File([], 'iris_dataset.csv', { type: 'text/csv' });
            dbManagerCtrl.upload('iris_dataset', emptyFile);
            expect(fetch).toBeCalledTimes(0);
        })

        test('Fetch must be called correctly', () => {
            dbManagerCtrl.upload('iris_dataset', fileCsv);
            const formData = new FormData();
            formData.append("file", fileCsv);
            expect(fetch).toBeCalledWith(`http://localhost:5000/api/upload/iris_dataset`, {
                "body": formData,
                "headers": { "authorization": "Bearer " },
                "method": "POST"
            });
        })

        test('Fetch must not be called', () => {
            fetch.mockImplementationOnce(() => Promise.reject(new Error("something gone wrong")));
            dbManagerCtrl.upload('iris_dataset', fileCsv);
            expect(errorSpy).toBeCalledTimes(1);
        })

        test('upload must return', async () => {
            fetch.mockImplementationOnce(() => Promise.resolve({
                json: () => { "File uploaded" },
            }));
            let res = await dbManagerCtrl.upload('iris_dataset', fileCsv);
            expect(res).toEqual("File uploaded");
        })
    })

    describe('Testing deleteTable method', () => {

        test('Fetch must be called 1 times', () => {
            dbManagerCtrl.deleteTable('iris_dataset');
            expect(fetch).toBeCalledTimes(1);
        })

        test('Fetch must be called correctly', () => {
            dbManagerCtrl.deleteTable('iris_dataset');
            expect(fetch).toBeCalledWith(`http://localhost:5000/api/delete/iris_dataset`, { 
                "headers": { "authorization": "Bearer " },
                "method": "DELETE"
            });
        })

        test('Fetch must not be called', () => {
            fetch.mockImplementationOnce(() => Promise.reject(new Error("something gone wrong")));
            dbManagerCtrl.deleteTable('iris_dataset');
            expect(errorSpy).toBeCalledTimes(1);
        })

        test('deleteTable must return', done => {
            fetch.mockImplementationOnce(() => Promise.resolve({
                json: () => { "The table iris_dataset was successfully deleted" },
            }));
            let res = dbManagerCtrl.deleteTable('iris_dataset');
            expect(res).toEqual("The table iris_dataset was successfully deleted");
            done();
        })
    })
})