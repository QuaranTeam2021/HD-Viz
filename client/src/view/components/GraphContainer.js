import React, { useEffect, useState } from 'react';
import FeaturesContainer from './FeaturesContainer';
import Graph from './Graph';
import RenameTitleGraph from './RenameTitleGraph';

// eslint-disable-next-line no-unused-vars
export default function GraphContainer({ algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, index }) {
	const [title, setTitle] = useState('Scatterplot Matrix');

	return (
		<div>
			<FeaturesContainer algoritmoGrafico={algoritmoGrafico} distanzaGrafico={distanzaGrafico} onDelete={onDelete} i={index} />
			<RenameTitleGraph title={title} setTitle={setTitle} />
			<Graph tipoGrafico={tipoGrafico} index={index} />
		</div>
	);
}