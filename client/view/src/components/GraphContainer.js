import React, { useState } from 'react';
import Graph from './Graph';
import FeaturesGraph from './FeaturesGraph';

function GraphContainer({algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, i, svg}) {
	
	return (
		<div>
            <FeaturesGraph algoritmoGrafico={algoritmoGrafico} distanzaGrafico={distanzaGrafico} onDelete={onDelete} i={i}/>
			<Graph svg={svg} tipoGrafico={tipoGrafico} />

		</div>
	)
}
export default GraphContainer; 