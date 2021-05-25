import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonCloseModalDb from '../../../../view/components/database/ButtonCloseModalDb';
import { IconButton } from '@material-ui/core';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing ButtonAddDb', () => {

    let wrapper;
    let onClick = jest.fn();

    beforeAll(() => {
        wrapper = mount(<ButtonCloseModalDb onClick={onClick} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('ButtonAddDb must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onChange method', () => {
        const buttonFile = wrapper.find(IconButton);
        buttonFile.simulate('click');
        expect(onClick).toBeCalledTimes(1);
    })
})

