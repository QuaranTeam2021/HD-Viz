import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import LocalLoaderController from '../../controller/LocalLoaderController';
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
        Object.defineProperty(global, 'Papa', {
            parse: jest.fn((data, props) => { 
                console.log(data);
                console.log(props);
                return { data: [['Dimension1', 'species'], [5.1, 'setosa']] }
            }),
            unparse: jest.fn()
        })
    }) 

    beforeEach(() => {
        console.error.mockClear();
        readAsTextSpy.mockClear();
    })

    afterAll(() => {
        console.error.mockRestore();
        readAsTextSpy.mockRestore();
    })

    test('Must not call readAsText', () => {
        const emptyFile = new File([], 'empty.csv', { type: 'test/csv' });
        loaderCtrl.parse(emptyFile);
        expect(readAsTextSpy).toBeCalledTimes(0);
    })

    test('Must call readAsText with file of type csv', () => {
        loaderCtrl.parse(fileCsv);
        expect(readAsTextSpy).toBeCalledTimes(1);
        expect(readAsTextSpy).toBeCalledWith(fileCsv, "utf-8");
    })

    test('Must call readAsText with file of type json', () => {
        loaderCtrl.parse(fileJson);
        expect(readAsTextSpy).toBeCalledWith(fileJson, "utf-8");
    })
})