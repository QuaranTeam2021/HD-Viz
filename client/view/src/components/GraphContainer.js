import FeaturesGraph from './FeaturesGraph';
import Graph from './Graph';
import React from 'react';

function GraphContainer({algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, i, svg}) {
	
	return (
		<div>
            <FeaturesGraph algoritmoGrafico={algoritmoGrafico} distanzaGrafico={distanzaGrafico} onDelete={onDelete} i={i}/>
			<Graph svg={svg} tipoGrafico={tipoGrafico} />

		</div>
	)
}
export default GraphContainer; 