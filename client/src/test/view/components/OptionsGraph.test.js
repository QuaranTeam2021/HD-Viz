import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import AccordionActions from '@material-ui/core/AccordionActions';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import OptionsGraph from '../../../view/components/OptionsGraph';
import React from 'react';
import { shallow } from 'enzyme';


describe('Testing OptionsGraph component', () => {

    let wrapper;
    let onDelete = jest.fn();
    let graphViz = '';
    let graphId = '';
    let graphType = ''; 
    let graphData = '';
    let graphTitle = '';
    let optionsPosition = '';

    beforeAll(() => {
        wrapper = shallow(<OptionsGraph onDelete={onDelete} graphViz={graphViz} graphId={graphId} graphType={graphType} graphData={graphData} graphTitle={graphTitle} optionsPosition={optionsPosition} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one AccordionActions', () => {
        expect(wrapper.find(AccordionActions).length).toEqual(1);
    })

    test('Includes two buttons', () => {
        expect(wrapper.find(Button).length).toEqual(2);
    })

    test('Includes one AccordionDetails', () => {
        expect(wrapper.find(AccordionDetails).length).toEqual(1);
    })

    test('Includes one AccordionSummary', () => {
        expect(wrapper.find(AccordionSummary).length).toEqual(1);
    })
})

