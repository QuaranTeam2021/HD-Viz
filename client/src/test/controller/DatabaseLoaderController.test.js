/* eslint-disable camelcase */
import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import DatabaseLoaderController from '../../controller/DatabaseLoaderController';
import Store from '../../store/Store';


const store = new Store();
const dbLoaderCtrl = new DatabaseLoaderController(store);

describe('Testing DatabaseLoaderController', () => {

    beforeAll(() => {
        global.fetch = jest.fn();
        jest.spyOn(console, 'error').mockImplementation(err => console.error(err));
        Object.defineProperty(global, 'Papa', {
            parse: jest.fn((data, props) => { 
                console.log(data);
                console.log(props);
                return { data: [['Dimension1', 'Dimension2', 'species'], [0.39819505433801394, 0.6562028224795202, 'setosa']] }
            }),
            unparse: jest.fn(() => [['Dimension1', 'Dimension2', 'species'], [0.39819505433801394, 0.6562028224795202, 'setosa']].toString())
        })
    })

    beforeEach(() => {
        fetch.mockClear();
        console.error.mockClear();
    });

    afterAll(() => {
        fetch.mockRestore();
        console.error.mockRestore();
    })

    describe('Testing loadTable method', () => {

        test('Fetch must be called 1 times', async () => {
            await dbLoaderCtrl.loadTable('iris_dataset');
            expect(fetch).toBeCalledTimes(1);
        })

        test('Fetch must be called with correct value', async () => {
            await dbLoaderCtrl.loadTable('iris_dataset');
            expect(fetch).toBeCalledWith(`http://localhost:5000/api/getcontent/iris_dataset`, {"headers": {"authorization": "Bearer "}});
        })

        test('Must return an Array', async () => {
            fetch.mockImplementationOnce(jest.fn(() => {
                return {
                    json: () => Promise.resolve([
                        {
                            Dimension1: 0.39819505433801394, 
                            Dimension2: 0.6562028224795202,
                            species: 'setosa'
                        }
                    ])
                }
            }));
            await dbLoaderCtrl.loadTable('iris_dataset');
            expect(store.originalData.matrix).toEqual([['Dimension1', 'Dimension2', 'species'], [0.39819505433801394, 0.6562028224795202, 'setosa']]);
        })

        test('Must print error on fetch reject', async () => {
            fetch.mockImplementationOnce(() => Promise.reject(new Error("something gone wrong")));
            await dbLoaderCtrl.loadTable('fakeTable');
            expect(console.error).toBeCalledTimes(1);
        })
    })

    describe('Testing loadTableCols method', () => {

        test('Fetch must be called 1 times', async () => {
            await dbLoaderCtrl.loadTableCols('iris_dataset', ['sepalLength', 'sepalWidth']);
            expect(fetch).toBeCalledTimes(1);
        })

        test('Fetch must be called with correct value', async () => {
            await dbLoaderCtrl.loadTableCols('iris_dataset', ['sepalLength', 'sepalWidth']);
            expect(fetch).toBeCalledWith(`http://localhost:5000/api/getselectedcol/iris_dataset`, {
                "body": "{\"features\":\"sepalLength,sepalWidth\"}",
                    "headers": {
                    "Content-Type": "application/json",
                    "authorization": `Bearer `
                },
                "method": "POST"
            });
        })

        test('Must print error if arg1 is not string', async () => {
            await dbLoaderCtrl.loadTableCols(7, ['sepalLength', 'sepalWidth']);
            expect(console.error).toBeCalled();
            expect(console.error).toBeCalledWith({ error: "select table name and features" });
        })

        test('Must print error if arg2 is not an Array', async () => {
            await dbLoaderCtrl.loadTableCols('iris_dataset', 'sepalLength');
            expect(console.error).toBeCalled();
            expect(console.error).toBeCalledWith({ error: "select table name and features" });
        })

        test('Must return an Array of columns', async () => {
            fetch.mockImplementationOnce(jest.fn(() => {
                return {
                    json: () => Promise.resolve([['Dimension1', 'species'], [5.1, 'setosa'], [4.2, 'setosa']])
                }
            }));
            await dbLoaderCtrl.loadTableCols('iris_dataset', ['sepalLenght', 'species']);
            expect(store.originalData.matrix).toEqual([['Dimension1', 'species'], [5.1, 'setosa'], [4.2, 'setosa']]);
        })
    })
})