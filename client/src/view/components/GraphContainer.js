import * as forceDir from '../chart/forceDirected';
import * as scpt from '../chart/scptMatrix';
import React, { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import FeaturesContainer from './FeaturesContainer';
import Graph from './Graph';
import { observer } from 'mobx-react-lite';
import RenameTitleGraph from './RenameTitleGraph';
import { useStore } from '../../store/Store';

const { forceDirected } = forceDir;
const { scpMatrix } = scpt;

const Prova = graphId => {
	const store = useStore();
	const graph = store.getGraphById(graphId.graphId); 
	scpMatrix(graph.data, store.features, store.features[0], graphId.graphId);

	return (
		<p>Prova</p>
	);
}

// eslint-disable-next-line no-unused-vars
const GraphContainer = observer(({ algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, graphId }) => {
	const [title, setTitle] = useState('Scatterplot Matrix');
	const store = useStore();

	/* questa è da rivedere => POTREBBE essere utile per le modifiche, ma nella creazione lo store cambia prima che si crei questa componente
	per cui non fa mai useEffect */
	useEffect(() => {
		const graph = store.getGraphById(graphId);
		scpMatrix(graph.data, store.features, store.features[4], graphId);
	}, [graphId, store])

	return (
		<div>
			{/* <FeaturesContainer onDelete={onDelete} graphId={graphId} /> */}
			<RenameTitleGraph title={title} setTitle={setTitle} />
			<div id={graphId} />
			<Prova graphId={graphId} />
		</div>
	);
});

export default GraphContainer;