/* eslint-disable react/jsx-key */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { act } from 'react-dom/test-utils'
import App from '../../../view/components/App';
import { expect } from 'chai';
import Header from '../../../view/components/Header';
import React from 'react';
import ReactDOM from 'react-dom';

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

describe.each([
	["App", <App />],
	["Header", <Header />]
])("Simple components tests", function (name, component) {
	it(`Render ${name} component`, function () {
		act(() => {
			ReactDOM.render(component, container);
		});
	})
})