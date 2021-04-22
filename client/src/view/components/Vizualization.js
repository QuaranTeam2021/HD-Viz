import Store, { useStore } from '../../store/Store';
import GraphContainer from './GraphContainer';
import React from 'react';
// import { useStore } from '../../store/Store';

export default function Vizualization({ algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, index }) {
	const store = useStore();
	// const store = new Store();

	return (
		<div>
			{store.graphs.forEach(g => {
				// niente algoritmo o distanza
				<GraphContainer graphId={g.graphId} key={g.graphId} tipoGrafico={g.type} onDelete={onDelete} />
			})}
        </div>
	)
}