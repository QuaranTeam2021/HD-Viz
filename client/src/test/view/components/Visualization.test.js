/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { act } from 'react-dom/test-utils';
import { expect } from 'chai';
import React from 'react';
import { render } from '../../testUtils';
import Visualization from '../../../view/components/Visualization';

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

describe("Visualization component tests", function () {
	it("Render Visualization component", function () {
		act(() => {
			render(<Visualization defineStore={() => ''} />);
		});
	});
});