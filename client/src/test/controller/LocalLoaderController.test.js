import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import LocalLoaderController from '../../controller/LocalLoaderController';
import Papa from 'papaparse';
import Store from '../../store/Store';

describe('Testing LocalLoaderController', () => {
    
    let dataTest, fileCsv, fileJson, loaderCtrl, readAsTextSpy, store;

    beforeAll(() => {
        store = new Store();
        loaderCtrl = new LocalLoaderController(store);
        dataTest = [ 
            ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
            [5.1, 3.5, 1.4, 0.2, 'setosa'],
            [4.9, 3, 1.4, 0.2, 'setosa']
        ];
        fileCsv = new File([dataTest.toString()], 'fileTest.csv', { type: 'text/csv' });
        fileJson = new File([dataTest.toString()], 'fileTest.json', { type: 'text/json' });
        jest.spyOn(console, 'error').mockImplementation(err => console.error(err));
        readAsTextSpy = jest.spyOn(FileReader.prototype, 'readAsText');
        jest.spyOn(console, 'log');
  /*      Object.defineProperty(global, 'Papa', {
            parse: jest.fn(() => { 
                return { data: [['Dimension1', 'species'], [5.1, 'setosa']] }
            }),
            unparse: jest.fn()
        })*/
        jest.spyOn(Papa, "parse").mockImplementation(() => { 
            return {
                data: [['Dimension1', 'species'], [5.1, 'setosa']]
            }
        })
        jest.spyOn(Papa, "unparse").mockImplementation(jest.fn())
    }) 

    beforeEach(() => {
        console.error.mockClear();
        readAsTextSpy.mockClear();
    })

    afterAll(() => {
        console.error.mockRestore();
        readAsTextSpy.mockRestore();
    })

    test('Must not call readAsText', async () => {
        const emptyFile = new File([], 'empty.csv', { type: 'test/csv' });
        try {
            await loaderCtrl.parse(emptyFile);
        } catch (e) {
            console.log(e.message)
        }
        expect(readAsTextSpy).not.toBeCalled();
    })

 /*   test('Must call readAsText with file of type csv', async () => {
        jest.spyOn(Promise, "resolve").mockImplementationOnce(jest.fn());
        try {
            await loaderCtrl.parse(fileCsv);
        } catch (e) {
            console.log(e.message)
        }
        expect(readAsTextSpy).toBeCalled();
        expect(readAsTextSpy).toBeCalledWith(fileCsv, "utf-8");
    })

    test('Must call readAsText with file of type json', async () => {
        jest.spyOn(Promise, "resolve").mockImplementationOnce(jest.fn());
        try {
            await loaderCtrl.parse(fileJson);
        } catch (e) {
            console.log(e.message)
        }
        expect(readAsTextSpy).toBeCalledWith(fileJson, "utf-8");
    })*/
})