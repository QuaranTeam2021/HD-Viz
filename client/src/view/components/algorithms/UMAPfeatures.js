import React from 'react';
import SliderNeighbors from './SliderNeighbors';
import SliderSize from './SliderSize';

export default function UMAPfeatures({ attributes }) {
	const { n, s } = attributes;
	const { neighbours, onChangeNeighbours } = n;
	const { onChangeSize, size } = s;

	return (
		<div>
			<SliderSize size={size} onChange={onChangeSize} />
			<SliderNeighbors neighbours={neighbours} onChange={onChangeNeighbours} />
		</div>
	);
}