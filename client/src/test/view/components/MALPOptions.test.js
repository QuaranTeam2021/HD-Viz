import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import Button from '@material-ui/core/Button';
import MALPOptions from '../../../view/components/MALPOptions';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing MALPOptions component', () => {

    let wrapper;

    beforeAll(() => {
        wrapper = shallow(<MALPOptions />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes two buttons', () => {
        expect(wrapper.find(Button).length).toEqual(2);
    })
})

