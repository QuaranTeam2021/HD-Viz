import { beforeAll, describe, expect, test } from '@jest/globals';
import TsneParameters from '../../../store/Parameters/TsneParameters';

describe('Testing concrete method of abstract class Graph', () => {

    let data;

    beforeAll(() => {
        data = [
            ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
            [5.1, 3.5, 1.4, 0.2, "setosa"],
            [4.9, 3, 1.4, 0.2, "setosa"],
            [4.7, 3.2, 1.3, 0.2, "setosa"]
        ];
    })

    describe('Testing contructor', () => {

        test('Must not be undefined', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            expect(param).not.toBeUndefined();
        })

        test('Must be instance of FastmapParameters', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            expect(param).toBeInstanceOf(TsneParameters);
        })

        test('Must pass', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            expect(param.dimensions).toEqual(10);
        })

        test('Must pass', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            expect(param.perplexity).toEqual(50);
        })

        test('Must pass', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            expect(param.epsilon).toEqual(30);
        })

        test('Must pass', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            expect(param.metric).toEqual('cosine');
        })

        test('Must pass', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            expect(param.data).toEqual(data);
        })
    })

    describe('Testing setters methods', () => {

        test('Must set metric', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            param.metric = 'canberra';
            expect(param.metric).toEqual('canberra');
        })

        test('Must set perplexity', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            param.perplexity = 110;
            expect(param.perplexity).toEqual(110);
        })

        test('Must set epsilon', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            param.epsilon = 124;
            expect(param.epsilon).toEqual(124);
        })
    })

    describe('Testing getters methods', () => {

        test('Must return metric', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            expect(param.metric).toEqual('cosine');
        })

        test('Must return perplexity', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            expect(param.perplexity).toEqual(50);
        })

        test('Must return epsilon', () => {
            const param = new TsneParameters(10, 50, 30, 'cosine', data);
            expect(param.epsilon).toEqual(30);
        })
    })
})