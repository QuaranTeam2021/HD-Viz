/* eslint-disable sort-keys */
/* eslint-disable camelcase */
import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import DatabaseTablesController from '../../controller/DatabaseTablesController';
import Store from '../../store/Store';

const dbTablesCtrl = new DatabaseTablesController(new Store());

describe('Testing DatabaseTableController', () => {

    beforeAll(() => {
        global.fetch = jest.fn();
        jest.spyOn(console, 'error').mockImplementation(err => console.error(err));
        jest.spyOn(console, 'log');
    })

    beforeEach(() => {
        fetch.mockClear();
        console.error.mockClear();
    })

    afterAll(() => {
        fetch.mockRestore();
        console.error.mockRestore();
    })

    describe('Testing getTablesName method', () => {

        test('fetch must be called 2 time', async () => {
            expect(fetch).toBeCalledTimes(0);
            try {
                await dbTablesCtrl.getTablesNames();
            } catch (e) {
                console.log(e.message);
            }
            expect(fetch).toBeCalledTimes(2);
        })

        test('fetch must be called correctly', async () => {
            try {
                await dbTablesCtrl.getTablesNames();
            } catch (e) {
                console.log(e.message);
            }
            expect(fetch).toHaveBeenNthCalledWith(1, "http://localhost:5000/jwt", {"body": "{\"username\":\"HD-Viz QuaranTeam\"}",
                "headers": {"Content-Type": "application/json"},
                "method": "POST"});
            expect(fetch).toHaveBeenNthCalledWith(2, "http://localhost:5000/api/tableslist", {"headers": {"authorization": "Bearer null"}});    
        })

        test('fetch must return correct table', async () => {
            fetch.mockImplementation(jest.fn(() => {
                return {
                    json: () => Promise.resolve([{ table_name: 'iris_dataset' }])
                }
            }))
            .mockImplementationOnce(jest.fn(() => {
                return {
                    json: jest.fn()
                }
            }));
            let res;
            try {
                res = await dbTablesCtrl.getTablesNames();
            } catch (e) {
                console.log(e.message);
            }
            expect(res).toEqual(['iris_dataset']);
        })

        test('Must print error when fetch reject', async () => {
            fetch.mockImplementationOnce(() => Promise.reject(new Error("something gone wrong")));
            try {
                await dbTablesCtrl.getTablesNames();
            } catch (e) {
                console.log(e.message);
            }
            expect(console.error).toBeCalled();
            expect(console.error).toBeCalledWith("something gone wrong");
        })
    })

    describe('Testing getTableColumnsNames method', () => {

        beforeAll(() => {
            jest.spyOn(console, 'log').mockImplementation(mex => console.log(mex));
        })

        afterEach(() => {
            console.log.mockClear();
        })

        afterAll(() => {
            console.log.mockRestore();
        })

        test('fetch must be called', async () => {
            try {
                await dbTablesCtrl.getTableColumnsNames('iris_dataset');
            } catch (e) {
                console.log(e.message);
            }
            expect(fetch).toBeCalled();
            expect(fetch).toBeCalledWith(`http://localhost:5000/api/getcolnames/iris_dataset`, {
                headers: { "authorization": `Bearer null` }
            });
        })

        test('console.log must be called', async () => {
            fetch.mockImplementationOnce(jest.fn(() => {
                return {
                    ok: true,
                    status: 'Success'
                }
            }));
            try {
                await dbTablesCtrl.getTableColumnsNames('iris_dataset');
            } catch (e) {
                console.log(e.message)
            }
            expect(console.log).toBeCalled();
        })

        test('Must print error when fetch reject', async () => {
            fetch.mockImplementationOnce(() => Promise.reject(new Error("something gone wrong")));
            try {
                await dbTablesCtrl.getTableColumnsNames('iris_dataset');
            } catch (e) {
                console.log(e.message);
            }
            expect(console.error).toBeCalled();
            expect(console.error).toBeCalledWith("something gone wrong");
        })

        test('must return empty array if response.ok is false', async () => {
            fetch.mockImplementationOnce(jest.fn(() => {
                return {
                    ok: false,
                    status: 'Success'
                }
            }));
            let response;
            try {
                response = await dbTablesCtrl.getTableColumnsNames('iris_dataset');
            } catch (e) {
                console.log(e.message);
            }
            expect(response).toEqual([]);
        })

        test('Must return correct columns', async () => {
            fetch.mockImplementationOnce(jest.fn(() => {
                return {
                    json: () => Promise.resolve([
                        {
                            column_name: 'sepalLenght'
                        },
                        {
                            column_name: 'sepalWidth'
                        }
                    ]),
                    ok: true,
                    status: 'Success'
                }
            }));
            let response;
            try {
                response = await dbTablesCtrl.getTableColumnsNames('iris_dataset');
            } catch (e) {
                console.log(e.message);
            }
            expect(response).toEqual(['sepalLenght', 'sepalWidth']);
        })
    })
})