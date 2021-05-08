/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { act } from 'react-dom/test-utils';
import BuildGraph from '../../../view/components/BuildGraph';
import { expect } from 'chai';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { render } from '../../testUtils';

let container;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

describe("BuildGraph component tests", function () {
	it("Render BuildGraph component", function () {
		act(() => {
			render(<MemoryRouter>
					<BuildGraph defineStore={() => ''}/>
				</MemoryRouter>);
		});
	});
});