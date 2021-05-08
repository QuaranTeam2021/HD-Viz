import * as forceDir from '../chart/forceDirected';
import * as htMp from '../chart/heatmap';
import * as linProj from '../chart/linearProjection';
import * as scptMat from '../chart/scptMatrix';
import GraphContainer from './GraphContainer';
import React from 'react';
import { useStore } from '../../store/Store';

const { forceDirected } = forceDir;
const { heatmap } = htMp;
const { linearProjection } = linProj;
const { scpMatrix } = scptMat;

const switchGraph = type => {
	switch (type) {
		case "scptMat":
			return scpMatrix;
		
		/* case "scp":
			return scpMatrix; */
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

const switchArguments = graph => {
	const { data, grouper } = graph;
	console.log(data);
	switch (graph.type) {
		case "scptMat":
			return [
				data,
				Object.keys(data[0]),
				grouper,
				graph.graphId,
			];
			
		/* case "scp":
		return scpMatrix; */
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

export default function Visualization({ algoritmoGrafico, tipoGrafico, distanzaGrafico, onDelete, index }) {
	const store = useStore();
	
	return (
		<div id="visualization">
			{store.graphs.map(g => {
				console.log(g.graphId);
				let title = "";
				switch (g.type) {
					case "scptMat":
						title = "Scatterplot Matrix";
						break;
					case "scp":
						title = "Scatterplot";
						break;
					case "htmp":
						title = "Heatmap";
						break;
					case "frcfld":
						title = "Force Field";
						break;
					case "malp":
						title = "Multiaxis Linear projection";
						break;
					default:
						console.log(`Grafico non supportato ${g.type}`);
						title = `Graph ${g.graphId}`;
						break;
				}
				return <GraphContainer graphId={g.graphId} key={g.graphId} graphTitle={title} onDelete={onDelete} switchGraph={switchGraph} switchArguments={switchArguments}/>
			})}
        </div>
	)
}