import React, { useEffect, useState } from 'react';
import FeaturesContainer from './FeaturesContainer';
import Graph from './Graph';
import { useStore } from '../../store/Store';

const GraphContainer = ({ graphTitle, onDelete, graphId, switchArguments, switchGraph }) => {
	const [optionsPosition, setOptionsPosition] = useState("up");
	const [updatableGraphViz, setUpdatableGraphViz] = useState(null)
	const store = useStore();
	const graph = store.getGraphById(graphId);
	const type = graph.type;
	const data = graph.data;
	const [render] = useState(() => switchGraph(graph.type));
	const [renderArguments] = useState(() => switchArguments(graph));

	useEffect(() => {
		setUpdatableGraphViz(render(...renderArguments));
	}, [render, renderArguments]);

	return (
		<div id={`cont-${graphId} opt-${optionsPosition}`/* classe per posizione opzioni*/}>
			<FeaturesContainer onDelete={onDelete} graphId={graphId} graphViz={updatableGraphViz} graphType={type} graphData={data} graphTitle={graphTitle} optionsPosition={{
				position: optionsPosition,
				setPosition: setOptionsPosition
			}} />
			<Graph graphId={graphId} />
		</div>
	);
};

export default GraphContainer;