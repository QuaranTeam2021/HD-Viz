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

// eslint-disable-next-line no-unused-vars
const GraphContainer = observer(({ algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, graphId }) => {
	const [title, setTitle] = useState('Scatterplot Matrix');
	const store = useStore();

	useEffect(() => autorun(() => {
		console.log(store.getGraphById(graphId));
	}), [graphId, store])

	useEffect(() => {
		const graph = store.getGraphById(graphId);
		scpMatrix(graph.data);
	}, [graphId, store])

	return (
		<div>
			{/* <FeaturesContainer onDelete={onDelete} graphId={graphId} /> */}
			<RenameTitleGraph title={title} setTitle={setTitle} />
			<div id={graphId} />
		</div>
	);
});

export default GraphContainer;