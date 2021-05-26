import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import DatabaseManagerController from '../../controller/DatabaseManagerController';
import Store from '../../store/Store';

const dbManagerCtrl = new DatabaseManagerController(new Store());
const fileCsv = new File([['fakeData', 1].toString()], 'iris_dataset.csv', { type: 'text/csv' });

describe('Testing DatabaseManagerController', () => {

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(err => console.error(err));
        global.fetch = jest.fn(() => {
            Promise.resolve({
                json: () => Promise.resolve({ tableName: 'iris_dataset' })
            });
        })
    })

    beforeEach(() => {
        fetch.mockClear();
        console.error.mockReset();
    });

    afterAll(() => {
        console.error.mockRestore();
        fetch.mockRestore();
    })

    describe('Testing upload method', () => {

        test('Fetch must be called 1 times', async () => {
            await dbManagerCtrl.upload('iris_dataset', fileCsv);
            expect(fetch).toBeCalledTimes(1);
        })

        test('Fetch must not be called', async () => {
            const emptyFile = new File([], 'iris_dataset.csv', { type: 'text/csv' });
            await dbManagerCtrl.upload('iris_dataset', emptyFile);
            expect(fetch).toBeCalledTimes(0);
        })

        test('Fetch must be called correctly', async () => {
            await dbManagerCtrl.upload('iris_dataset', fileCsv);
            const formData = new FormData();
            formData.append("file", fileCsv);
            expect(fetch).toBeCalledWith(`http://localhost:5000/api/upload/iris_dataset`, {
                "body": formData,
                "headers": { "authorization": "Bearer null" },
                "method": "POST"
            });
        })

        test('Must print error on fetch reject', async () => {
            global.fetch = jest.fn(() => {
                Promise.resolve({
                    json: () => Promise.reject(new Error("something gone wrong"))
                });
            })
            await dbManagerCtrl.upload('iris_dataset', fileCsv);
            expect(console.error).toBeCalled();
        })

        test('upload must return', async () => {
            fetch.mockImplementationOnce(() => Promise.resolve({
                json: () => Promise.resolve("File successfully uploaded"),
            }));
            let res = await dbManagerCtrl.upload('iris_dataset', fileCsv);
            expect(res).toEqual("File successfully uploaded");
        })
    })

    describe('Testing deleteTable method', () => {

        test('Fetch must be called 1 times', async () => {
            await dbManagerCtrl.deleteTable('iris_dataset');
            expect(fetch).toBeCalledTimes(1);
        })

        test('Fetch must be called correctly', async () => {
            await dbManagerCtrl.deleteTable('iris_dataset');
            expect(fetch).toBeCalledWith(`http://localhost:5000/api/delete/iris_dataset`, { 
                "headers": { "authorization": "Bearer null" },
                "method": "DELETE"
            });
        })

       test('Fetch must not be called', async () => {
            fetch.mockImplementationOnce(() => Promise.reject(new Error("something gone wrong")));
            await dbManagerCtrl.deleteTable('iris_dataset');
            expect(console.error).toBeCalled();
        })

        test('deleteTable must return', async () => {
            fetch.mockImplementationOnce(() => Promise.resolve({
                json: () => Promise.resolve("The table iris_dataset was successfully deleted")
            }));
            let res = await dbManagerCtrl.deleteTable('iris_dataset');
            expect(res).toEqual("The table iris_dataset was successfully deleted");
        })
    })
})