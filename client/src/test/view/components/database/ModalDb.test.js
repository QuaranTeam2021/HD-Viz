import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import DbButton from '../../../../view/components/database/DbButton'; 
import Modal from '@material-ui/core/Modal';
import ModalDb from '../../../../view/components/database/ModalDb';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing ModalDb component', () => {

    let wrapper;
    let onSubmit = jest.fn();

    beforeAll(() => {
        wrapper = mount(<ModalDb onSubmit={onSubmit} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('Renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one Modal', () => {
        expect(wrapper.find(Modal)).toHaveLength(1);
    })

    test('Includes one DbButton', () => {
        expect(wrapper.find(DbButton)).toHaveLength(1);
    })
})

