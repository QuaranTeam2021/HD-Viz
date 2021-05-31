import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import App, { StoreObserver } from '../../../view/components/App';
import BuildGraph from '../../../view/components/BuildGraph';
import Database from '../../../view/components/database/Database';
import Footer from '../../../view/components/Footer';
import Header from '../../../view/components/Header';
import React from 'react';
import { shallow } from 'enzyme';
import Store from '../../../store/Store';

describe("App component tests", () => {

	let wrapper;

	beforeAll(() => {
		wrapper = shallow(<App />);
	})

	afterAll(() => {
		wrapper.unmount();
	})

	test("Testing render", () => {
		expect(wrapper).not.toBeNull();
	})

    test('Includes Header component', () => {
        expect(wrapper.find(Header)).not.toBeNull();
    })

    test('Includes Footer component', () => {
        expect(wrapper.find(Footer)).not.toBeNull();
    })

    test('Includes Database component', () => {
        expect(wrapper.find(Database)).not.toBeNull();
    })
    
    test('Includes BuildGraph component', () => {
        expect(wrapper.find(BuildGraph)).not.toBeNull();
    })

    test('Includes the menu list', () => {
        expect(wrapper.find('.main_menu')).toHaveLength(1);
    })

    test('Includes three Link', () => {
        const link = wrapper.find('Link');
        expect(link).toHaveLength(3);
    })

    test('StoreObserver must return correctly', () => {
        Object.defineProperty(Store, 'useStore', {
            value: new Store()
        })
        Object.defineProperty(Store, 'graphs', {
            get: () => []
        })
        const defineStore = jest.fn();
        let StoreObserverWrapper = shallow(<StoreObserver defineStore={defineStore} />);
        expect(StoreObserverWrapper).not.toBeNull();
    })
});