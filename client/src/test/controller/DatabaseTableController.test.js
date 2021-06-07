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
            await dbTablesCtrl.getTablesNames();
            expect(fetch).toBeCalledTimes(2);
        })

        test('fetch must be called correctly', async () => {
            await dbTablesCtrl.getTablesNames();
            expect(fetch).toHaveBeenNthCalledWith(1, "http://localhost:5000/jwt", {"body": "{\"username\":\"HD-Viz QuaranTeam\"}", "headers": {"Content-Type": "application/json"}, "method": "POST"});
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
            let res = await dbTablesCtrl.getTablesNames();
            expect(res).toEqual(['iris_dataset']);
        })

        test('Must print error when fetch reject', async () => {
            fetch.mockImplementationOnce(() => Promise.reject(new Error("something gone wrong")));
            let res = await dbTablesCtrl.getTablesNames();
            expect(res).toEqual([]);
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
            await dbTablesCtrl.getTableColumnsNames('iris_dataset');
            expect(fetch).toBeCalledTimes(1);
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
            await dbTablesCtrl.getTableColumnsNames('iris_dataset');
            expect(console.log).toBeCalledTimes(1);
            expect(console.log).toBeCalledWith("STATUS: ", "Success", " ESITO: ", true);
        })

        test('Must print error when fetch reject', async () => {
            fetch.mockImplementationOnce(() => Promise.reject(new Error("something gone wrong")));
            let res = await dbTablesCtrl.getTableColumnsNames('iris_dataset');
            expect(res).toEqual([]);
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
            let response = await dbTablesCtrl.getTableColumnsNames('iris_dataset');
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
            let response = await dbTablesCtrl.getTableColumnsNames('iris_dataset');
            expect(response).toEqual(['sepalLenght', 'sepalWidth']);
        })
    })
})