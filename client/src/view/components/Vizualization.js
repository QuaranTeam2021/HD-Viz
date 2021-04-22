import GraphContainer from './GraphContainer';
import React from 'react';

export default function Vizualization({ algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, index }) {

	return (
		<div>
			<GraphContainer algoritmoGrafico={algoritmoGrafico} tipoGrafico={tipoGrafico} distanzaGrafico={distanzaGrafico} onDelete={onDelete} index={index} />
        </div>
	)
}