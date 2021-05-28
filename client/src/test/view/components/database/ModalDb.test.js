import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonCloseModalDb from '../../../../view/components/database/ButtonCloseModalDb';
import ButtonConfirmDb from '../../../../view/components/database/ButtonConfirmDb';
import DbButton from '../../../../view/components/database/DbButton'; 
import Modal from '@material-ui/core/Modal';
import ModalDb from '../../../../view/components/database/ModalDb';
import React from 'react';
import SelectVizColumns from '../../../../view/components/database/SelectVizColumns';
import SelectVizTable from '../../../../view/components/database/SelectVizTable';
import { shallow} from 'enzyme';

describe('Testing ModalDb component', () => {

    let wrapper;
    let onSubmit = jest.fn();
    const setState = jest.fn();

    beforeAll(() => {
        Object.defineProperty(React, 'useState', {
            value: val => [val, setState]
        })
        wrapper = shallow(<ModalDb onSubmit={onSubmit} />);
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterAll(() => {
        wrapper.unmount();
        jest.restoreAllMocks();
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

    test('Must call onOpen method', () => {
        const onOpen = wrapper.find(DbButton).prop('onClick');
        expect(setState).toBeCalledTimes(0);
        onOpen();
        expect(setState).toBeCalledTimes(1);
    })

    test('Must call onClose method', () => {
        const onClose = wrapper.find(ButtonCloseModalDb).prop('onClick');
        expect(setState).toBeCalledTimes(0);
        onClose();
        expect(setState).toBeCalledTimes(1);
    })

    test('Must call onChangeColumnsDb method', () => {
        const onChangeColumnsDb = wrapper.find(SelectVizColumns).prop('onChange');
        expect(setState).toBeCalledTimes(0);
        const event = { target: { value: 'test' } };
        onChangeColumnsDb(event);
        expect(setState).toBeCalledTimes(1);
    })

    test('Must call onChangeTableDb method', () => {
        const onChangeTableDb = wrapper.find(SelectVizTable).prop('onChange');
        expect(setState).toBeCalledTimes(0);
        const event = { target: { value: 'test' } };
        onChangeTableDb(event);
        expect(setState).toBeCalledTimes(1);
    })

    test('Must call onClickConfirm method', () => {
        const onClickConfirm = wrapper.find(ButtonConfirmDb).prop('onClick');
        expect(setState).toBeCalledTimes(0);
        onClickConfirm();
        expect(setState).toBeCalledTimes(1);
    })
})

