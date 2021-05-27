import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Graph from '../../../view/components/Graph';
import GraphContainer from '../../../view/components/GraphContainer';
import OptionsGraph from '../../../view/components/OptionsGraph';
import React from 'react';
import { shallow } from 'enzyme';
import Store from '../../../store/Store';

describe('Testing GraphContainer component', () => {

    let wrapper;

    let graphTitle = 'id2';
    let onDelete = jest.fn();
    let graphId = 'testId';
    let switchArguments = jest.fn();
    let switchGraph = jest.fn();

    beforeAll(() => {
        const testGraph = {
            data: [],
            graphId: 'testId',
            grouper: '',
            type: 'scptMat'
        }
        Object.defineProperty(Store, 'getGraphById', {
			value: () => testGraph
		});
        wrapper = shallow(<GraphContainer graphTitle={graphTitle} onDelete={onDelete} graphId={graphId} switchArguments={switchArguments} switchGraph={switchGraph} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    })

    test('Includes one OptionsGraph', () => {
        expect(wrapper.find(OptionsGraph).length).toEqual(1);
    })

    test('Includes one Graph', () => {
        expect(wrapper.find(Graph).length).toEqual(1);
    })
})

