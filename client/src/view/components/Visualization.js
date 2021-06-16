import * as forceDir from '../chart/forceDirected';
import * as htMp from '../chart/heatmap';
import * as linProj from '../chart/linearProjection';
import * as scptMat from '../chart/scptMatrix';
import React, { useEffect } from 'react';
import { autorun } from 'mobx';
import GraphContainer from './GraphContainer';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Store';

const { forceDirected } = forceDir;
const { heatmap } = htMp;
const { linearProjection } = linProj;
const { scpMatrix } = scptMat;

export const switchGraph = type => {
	switch (type) {
		case "scptMat":
			return scpMatrix;
		case "htmp":
			return heatmap;
		case "frcfld":
			return forceDirected;
		case "malp":
			return linearProjection;
		default:
			return null;
	}
}

export const switchArguments = graph => {
	const { data, grouper } = graph;
	switch (graph.type) {
		case "scptMat":
			return [
				data,
				Object.keys(data[0]),
				grouper,
				graph.graphId,
			];
		case "htmp":
			return [
				data,
				graph.graphId
			];
		case "frcfld":
			return [
				data,
				graph.graphId
			];
		case "malp":
			return [
				data,
				Object.keys(data[0]),
				grouper,
				graph.graphId,
			];
		default:
			return null;
	}
}

const Visualization = observer(() => {
	const store = useStore();
	
	useEffect(() => autorun(() => {
		// 
	}), [])

	return (
		<div className="visualization">
			{store.graphs.map(g => {
				let title = "";
				switch (g.type) {
					case "scptMat":
						title = "Scatterplot Matrix";
						break;
					case "htmp":
						title = "Heatmap";
						break;
					case "frcfld":
						title = "Force Field";
						break;
					case "malp":
						title = "Proiezione Multiassi";
						break;
					default:
						// console.log(`Grafico non supportato ${g.type}`);
						title = `Graph ${g.graphId}`;
						break;
				}

				return <GraphContainer key={g.graphId} graphId={g.graphId} graphTitle={title} onDelete={id => store.removeGraph(id)} switchGraph={switchGraph} switchArguments={switchArguments} />;
			})}
		</div>
	);
});

export default Visualization;