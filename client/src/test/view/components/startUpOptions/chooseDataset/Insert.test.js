import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Insert from '../../../../../view/components/startUpOptions/chooseDataset/Insert';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing Insert component', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<Insert fileName={'fileTest.csv'} onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('Renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one input', () => {
        expect(wrapper.find('input').length).toEqual(1);
    })

    test('Includes one button', () => {
        expect(wrapper.find('[component="span"]').length).toEqual(1);
    })

    test('Must call onChange', () => {
        const testFile = new File([''], 'testFile.csv', { type: 'text/csv' });
        expect(onChange).toBeCalledTimes(0);
        wrapper.find('input').simulate('change', { target: { files: [testFile] } });
        expect(onChange).toBeCalledTimes(1);
    })
})

