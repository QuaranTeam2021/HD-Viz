import FeaturesContainer from './FeaturesContainer';
// import Graph from './Graph';
import React from 'react';
import RenameTitleGraph from './RenameTitleGraph';

// eslint-disable-next-line no-unused-vars
export default function GraphContainer({algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, i, svg}) {
	
	const [title, setTitle] = React.useState('Scatterplot');

	return (
		<div>
			<FeaturesContainer algoritmoGrafico={algoritmoGrafico} distanzaGrafico={distanzaGrafico} onDelete={onDelete} i={i}/>
			<RenameTitleGraph title={title} setTitle={setTitle} />
			{/* <Graph svg={svg} tipoGrafico={tipoGrafico} /> */}
		</div>
	)
} 