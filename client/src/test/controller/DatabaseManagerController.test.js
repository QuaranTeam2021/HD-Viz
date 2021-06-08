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
            try {
                await dbManagerCtrl.upload('iris_dataset', fileCsv);
            } catch (e) {
                console.log(e.message)
            }
            expect(fetch).toBeCalledTimes(1);
        })

        test('Fetch must not be called', async () => {
            const emptyFile = new File([], 'iris_dataset.csv', { type: 'text/csv' });
            try {
                await dbManagerCtrl.upload('iris_dataset', emptyFile);
            } catch (e) {
                console.log(e.message)
            }
            expect(fetch).toBeCalledTimes(0);
        })

        test('Fetch must be called correctly', async () => {
            try {
                await dbManagerCtrl.upload('iris_dataset', fileCsv);
            } catch (e) {
                console.log(e.message)
            }
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
            try {
                await dbManagerCtrl.upload('iris_dataset', fileCsv);
            } catch (e) {
                console.log(e.message)
            }
            expect(console.error).toBeCalled();
        })

        test('upload must return', async () => {
            fetch.mockImplementationOnce(() => Promise.resolve({
                json: () => Promise.resolve("File successfully uploaded"),
                ok: true
            }));
            let res;
            try {
                res = await dbManagerCtrl.upload('iris_dataset', fileCsv);
            } catch (e) {
                console.log(e.message)
            }
            expect(res).toEqual("File successfully uploaded");
        })
    })

    describe('Testing deleteTable method', () => {

        test('Fetch must be called 1 times', async () => {
            try {
                await dbManagerCtrl.deleteTable('iris_dataset');
            } catch (e) {
                console.log(e.message)
            }
            expect(fetch).toBeCalledTimes(1);
        })

        test('Fetch must be called correctly', async () => {
            try {
                await dbManagerCtrl.deleteTable('iris_dataset');
            } catch (e) {
                console.log(e.message)
            }
            expect(fetch).toBeCalledWith(`http://localhost:5000/api/delete/iris_dataset`, { 
                "headers": { "authorization": "Bearer null" },
                "method": "DELETE"
            });
        })

       test('Fetch must not be called', async () => {
            fetch.mockImplementationOnce(() => Promise.reject(new Error("something gone wrong")));
            try {
                await dbManagerCtrl.deleteTable('iris_dataset');
            } catch (e) {
                console.log(e.message)
            }
            expect(console.error).toBeCalled();
        })

        test('deleteTable must return', async () => {
            fetch.mockImplementationOnce(() => Promise.resolve({
                json: () => Promise.resolve("The table iris_dataset was successfully deleted")
            }));
            let res;
            try {
                res = await dbManagerCtrl.deleteTable('iris_dataset');
            } catch (e) {
                console.log(e.message)
            }
            expect(res).toEqual("The table iris_dataset was successfully deleted");
        })
    })
})