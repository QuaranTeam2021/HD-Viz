import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import Graph from '../../../view/components/Graph';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing Graph component', () => {

    let wrapper;

    beforeAll(() => {
        wrapper = shallow(<Graph graphId={'testId'}/>);
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

    test('Must have correct id', () => {
        expect(wrapper.find('#testId').length).toEqual(1);
    })
})

