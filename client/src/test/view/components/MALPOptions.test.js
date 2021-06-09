import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import MALPOptions from '../../../view/components/MALPOptions';
import { mount } from 'enzyme';
import React from 'react';
import SelectVizColumns from '../../../view/components/database/SelectVizColumns';

describe('Testing MALPOptions component', () => {

    let wrapper;
    const setState = jest.fn();

    beforeAll(() => {
        jest.spyOn(React, "useState").mockImplementation(val => [val, setState]);
        let graphViz = {
            getAllCols: jest.fn(),
            updateColumns: jest.fn(),
        }
        let buttonRef = {
            current: {
                onClick: jest.fn()
            }
        }
        wrapper = mount(<MALPOptions graphViz={graphViz} buttonRef={buttonRef} currentOptions={jest.fn()} setCurrentOptions={jest.fn()} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('onChangeColumns must work correctly', () => {
        const onChangeColumns = wrapper.find(SelectVizColumns).prop('onChange');
        expect(setState).not.toBeCalled();
        onChangeColumns({ target: { value: ['test'] } });
        expect(setState).toBeCalled();
    })
})

