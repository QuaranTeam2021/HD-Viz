import { describe, expect, jest, test } from '@jest/globals';
import LocalLoaderController from '../../controller/LocalLoaderController';
import Store from '../../store/Store';

const loaderCtrl = new LocalLoaderController(new Store());
const dataTest = [ 
    ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
    [5.1, 3.5, 1.4, 0.2, 'setosa'],
    [4.9, 3, 1.4, 0.2, 'setosa']
];
const file = new File([dataTest.toString()], 'fileTest.csv', {
    type: 'text/csv'
});
const fileJson = new File([dataTest.toString()], 'fileTest.json', {
    type: 'text/json'
});
const readAsTextSpy = jest.spyOn(FileReader.prototype, 'readAsText');

describe('Testing LocalLoaderController', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    })

    test("readAsText must be called 1 times", () => {
        loaderCtrl.parse(file);
        expect(readAsTextSpy).toBeCalledTimes(1);
    }) 

    test("readAsText must not be called", () => {
        const emptyFile = new File([], 'fileTest.csv', {
            type: 'text/csv'
        });
        loaderCtrl.parse(emptyFile);
        expect(readAsTextSpy).toBeCalledTimes(0);
    }) 

    test("readAsText must be called 1 time with json files", () => {
        loaderCtrl.parse(fileJson);
        expect(readAsTextSpy).toBeCalledTimes(1);
    }) 

    test("Must print an error", () => {
        loaderCtrl.parse();
        expect(console.error).toBeCalledTimes(1);
    })
})