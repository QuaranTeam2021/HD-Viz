import { describe, expect, jest, test } from '@jest/globals';
import LocalLoaderController from '../../controller/LocalLoaderController';
import Store from '../../store/Store';

const loaderCtrl = new LocalLoaderController(new Store());
const dataTest = [ 
    ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
    [5.1, 3.5, 1.4, 0.2, 'setosa'],
    [4.9, 3, 1.4, 0.2, 'setosa']
];
const fileCsv = new File([dataTest.toString()], 'fileTest.csv', { type: 'text/csv' });
const fileJson = new File([dataTest.toString()], 'fileTest.json', { type: 'text/json' });
const readAsTextSpy = jest.spyOn(FileReader.prototype, 'readAsText');

describe('Testing LocalLoaderController', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    })

    test('Must not call readAsText', () => {
        const emptyFile = new File([], 'empty.csv', { type: 'test/csv' });
        loaderCtrl.parse(emptyFile);
        expect(readAsTextSpy).toBeCalledTimes(0);
    })

    test('Must call readAsText with fileCsv', () => {
        loaderCtrl.parse(fileCsv);
        expect(readAsTextSpy).toBeCalledTimes(1);
        expect(readAsTextSpy).toBeCalledWith(fileCsv, "utf-8");
    })

    test('Must call readAsText with fileCsv', () => {
        loaderCtrl.parse(fileJson);
        expect(readAsTextSpy).toBeCalledWith(fileJson, "utf-8");
    })
})