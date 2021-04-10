import React, { useState } from 'react';
import GraphContainer from './GraphContainer';

function VizContainer({algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, index, svg}) {

    const [i] = useState(index);

	return (
		<div>
			<GraphContainer algoritmoGrafico={algoritmoGrafico} tipoGrafico={tipoGrafico} distanzaGrafico={distanzaGrafico} onDelete={onDelete} index={i} /* svg={svg} *//>
        </div>
	)
}
export default VizContainer;