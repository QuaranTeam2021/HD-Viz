import React, { useState } from 'react';
import GraphContainer from './GraphContainer';

// eslint-disable-next-line no-unused-vars
function VizContainer({algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, index, svg}) {

    const [i] = useState(index);

	return (
		<div>
			{/* eslint-disable-next-line no-inline-comments */}
			<GraphContainer algoritmoGrafico={algoritmoGrafico} tipoGrafico={tipoGrafico} distanzaGrafico={distanzaGrafico} onDelete={onDelete} index={i} /* svg={svg} *//>
        </div>
	)
}
export default VizContainer;