import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonCloseModalDb from '../../../../view/components/database/ButtonCloseModalDb';
import ButtonConfirmDb from '../../../../view/components/database/ButtonConfirmDb';
import DatabaseLoaderController from '../../../../controller/DatabaseLoaderController';
import DbButton from '../../../../view/components/database/DbButton'; 
import Modal from '@material-ui/core/Modal';
import ModalDb from '../../../../view/components/database/ModalDb';
import React from 'react';
import SelectVizColumns from '../../../../view/components/database/SelectVizColumns';
import SelectVizTable from '../../../../view/components/database/SelectVizTable';
import { shallow} from 'enzyme';

jest.mock('../../../../controller/DatabaseLoaderController');

describe('Testing ModalDb component', () => {

    let wrapper;
    let onSubmit = jest.fn();
    const setState = jest.fn();
    const loadTableSpy = jest.fn();
    const loadTableColsSpy = jest.fn();

    beforeAll(() => {
        Object.defineProperty(React, 'useState', {
            value: val => [val, setState]
        })
        DatabaseLoaderController.mockImplementation(() => {
            return {
                loadTable: loadTableSpy,
                loadTableCols: loadTableColsSpy
            }
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

    test('onOpen must work correctly', () => {
        const onOpen = wrapper.find(DbButton).prop('onClick');
        expect(setState).not.toBeCalled();
        onOpen();
        expect(setState).toBeCalled();
    })

    test('onClose must work correctly', () => {
        const onClose = wrapper.find(ButtonCloseModalDb).prop('onClick');
        expect(setState).not.toBeCalled();
        onClose();
        expect(setState).toBeCalled();
    })

    test('onChangeColumnsDb must work correctly', () => {
        const onChangeColumnsDb = wrapper.find(SelectVizColumns).prop('onChange');
        expect(setState).not.toBeCalled();
        const event = { target: { value: 'test' } };
        onChangeColumnsDb(event);
        expect(setState).toBeCalled();
    })

    test('onChangeTableDb must work correctly', () => {
        const onChangeTableDb = wrapper.find(SelectVizTable).prop('onChange');
        expect(setState).not.toBeCalled();
        const event = { target: { value: 'test' } };
        onChangeTableDb(event);
        expect(setState).toBeCalled();
    })

    test('onClickConfirm must work correctly', async () => {
        const onClickConfirm = wrapper.find(ButtonConfirmDb).prop('onClick');
        expect(loadTableSpy).not.toBeCalled();
        await onClickConfirm();
        expect(loadTableSpy).toBeCalled();
    })

    test('onClickConfirm must work correctly', async () => {
        jest.spyOn(React, 'useState').mockImplementation(val => [val, setState])
            .mockImplementationOnce(val => [val, setState])
            .mockImplementationOnce(() => [['test'], setState]);
        DatabaseLoaderController.mockImplementation(() => {
            return {
                loadTable: loadTableSpy,
                loadTableCols: loadTableColsSpy
            }
        })
        wrapper = shallow(<ModalDb onSubmit={onSubmit} />);
        const onClickConfirm = wrapper.find(ButtonConfirmDb).prop('onClick');
        expect(loadTableColsSpy).not.toBeCalled();
        await onClickConfirm();
        expect(loadTableColsSpy).toBeCalled();
    })
})

