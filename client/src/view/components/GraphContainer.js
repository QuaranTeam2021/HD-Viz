import React, { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import FeaturesContainer from './FeaturesContainer';
import Graph from './Graph';
import { observer } from 'mobx-react-lite';
import RenameTitleGraph from './RenameTitleGraph';
import { useStore } from '../../store/Store';

// eslint-disable-next-line no-unused-vars
const GraphContainer = observer(({ algoritmoGrafico, graphTitle, distanzaGrafico, onDelete, graphId, switchArguments, switchGraph }) => {
	const [title, setTitle] = useState(graphTitle);
	const store = useStore();
	const graph = store.getGraphById(graphId);
	const render = useState(() => switchGraph(graph.type))[0];
	const [renderArguments, setRenderArguments] = useState(() => switchArguments(graph));

	/* questa è da rivedere => POTREBBE essere utile per le modifiche, ma nella creazione lo store cambia prima che si crei questa componente
	per cui non fa mai useEffect */
	useEffect(() => {
		render(...renderArguments);
	}, [render, renderArguments])
	
	useEffect(() => autorun(() => {
		//
	}), [])
	
	return (
		<React.Fragment key={`cont-${graphId}`}>
			{/* <FeaturesContainer onDelete={onDelete} graphId={graphId} /> */}
			<div className="GraphCont">
				<RenameTitleGraph title={title} setTitle={setTitle} />
				<Graph graphId={graphId} />
			</div>
		</React.Fragment>
	);
});

export default GraphContainer;