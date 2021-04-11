import React, { useState } from 'react'
import {scatterPlot, addData} from './scatteplot'
import {scpMatrix} from './scptMatrix'
import {updateStrength, updateDistanceMin, updateDistanceMax, forceDirected} from './forceDirected'
import {heatmap} from './heatmap'
import { add } from 'mathjs';
const graphData = require('./miserables.json');
const data = require('./penguin.json');

function Prova() {

const dtx =  [
    ['sepalLength','sepalWidth','petalLength','petalWidth','species'],
    [5.1,3.5,1.4,0.2,'setosa'],
    [4.9,3,1.4,0.2,'setosa'],
    [4.7,3.2,1.3,0.2,'setosa'],
    [4.6,3.1,1.5,0.2,'setosa'],
    [5,3.6,1.4,0.2,'setosa']];
        const addGraph = () => {
        scatterPlot(dtx,["sepalLength"],["sepalLength"],["petalLength"]);
    }
    

    const datax = [  { 'group': 1, 'variable': 1, 'value': 30 },
{ 'group': 1, 'variable': 2, 'value': 95 },
{ 'group': 1, 'variable': 3, 'value': 22 },
{ 'group': 1, 'variable': 4, 'value': 14 },
{ 'group': 1, 'variable': 5, 'value': 59 },
{ 'group': 1, 'variable': 6, 'value': 52 },
{ 'group': 1, 'variable': 7, 'value': 88 },
{ 'group': 1, 'variable': 8, 'value': 20 },
{ 'group': 1, 'variable': 9, 'value': 99 },
{ 'group': 1, 'variable': 10, 'value': 66 },
{ 'group': 2, 'variable': 1, 'value': 37 },
{ 'group': 2, 'variable': 2, 'value': 50 },
{ 'group': 2, 'variable': 3, 'value': 81 },
{ 'group': 2, 'variable': 4, 'value': 79 },
{ 'group': 2, 'variable': 5, 'value': 84 },
{ 'group': 2, 'variable': 6, 'value': 91 },
{ 'group': 2, 'variable': 7, 'value': 82 },
{ 'group': 2, 'variable': 8, 'value': 89 },
{ 'group': 2, 'variable': 9, 'value': 6 },
{ 'group': 2, 'variable': 10, 'value': 67 },
{ 'group': 3, 'variable': 1, 'value': 96 },
{ 'group': 3, 'variable': 2, 'value': 13 },
{ 'group': 3, 'variable': 3, 'value': 98 },
{ 'group': 3, 'variable': 4, 'value': 10 },
{ 'group': 3, 'variable': 5, 'value': 86 },
{ 'group': 3, 'variable': 6, 'value': 23 },
{ 'group': 3, 'variable': 7, 'value': 74 },
{ 'group': 3, 'variable': 8, 'value': 47 },
{ 'group': 3, 'variable': 9, 'value': 73 },
{ 'group': 3, 'variable': 10, 'value': 40 },
{ 'group': 4, 'variable': 1, 'value': 75 },
{ 'group': 4, 'variable': 2, 'value': 18 },
{ 'group': 4, 'variable': 3, 'value': 92 },
{ 'group': 4, 'variable': 4, 'value': 43 },
{ 'group': 4, 'variable': 5, 'value': 16 },
{ 'group': 4, 'variable': 6, 'value': 27 },
{ 'group': 4, 'variable': 7, 'value': 76 },
{ 'group': 4, 'variable': 8, 'value': 24 },
{ 'group': 4, 'variable': 9, 'value': 1 },
{ 'group': 4, 'variable': 10, 'value': 87 },
{ 'group': 5, 'variable': 1, 'value': 44 },
{ 'group': 5, 'variable': 2, 'value': 29 },
{ 'group': 5, 'variable': 3, 'value': 58 },
{ 'group': 5, 'variable': 4, 'value': 55 },
{ 'group': 5, 'variable': 5, 'value': 65 },
{ 'group': 5, 'variable': 6, 'value': 56 },
{ 'group': 5, 'variable': 7, 'value': 9 },
{ 'group': 5, 'variable': 8, 'value': 78 },
{ 'group': 5, 'variable': 9, 'value': 49 },
{ 'group': 5, 'variable': 10, 'value': 36 },
{ 'group': 6, 'variable': 1, 'value': 35 },
{ 'group': 6, 'variable': 2, 'value': 80 },
{ 'group': 6, 'variable': 3, 'value': 8 },
{ 'group': 6, 'variable': 4, 'value': 46 },
{ 'group': 6, 'variable': 5, 'value': 48 },
{ 'group': 6, 'variable': 6, 'value': 100 },
{ 'group': 6, 'variable': 7, 'value': 17 },
{ 'group': 6, 'variable': 8, 'value': 41 },
{ 'group': 6, 'variable': 9, 'value': 33 },
{ 'group': 6, 'variable': 10, 'value': 11 },
{ 'group': 7, 'variable': 1, 'value': 77 },
{ 'group': 7, 'variable': 2, 'value': 62 },
{ 'group': 7, 'variable': 3, 'value': 94 },
{ 'group': 7, 'variable': 4, 'value': 15 },
{ 'group': 7, 'variable': 5, 'value': 69 },
{ 'group': 7, 'variable': 6, 'value': 63 },
{ 'group': 7, 'variable': 7, 'value': 61 },
{ 'group': 7, 'variable': 8, 'value': 54 },
{ 'group': 7, 'variable': 9, 'value': 38 },
{ 'group': 7, 'variable': 10, 'value': 93 },
{ 'group': 8, 'variable': 1, 'value': 39 },
{ 'group': 8, 'variable': 2, 'value': 26 },
{ 'group': 8, 'variable': 3, 'value': 90 },
{ 'group': 8, 'variable': 4, 'value': 83 },
{ 'group': 8, 'variable': 5, 'value': 31 },
{ 'group': 8, 'variable': 6, 'value': 2 },
{ 'group': 8, 'variable': 7, 'value': 51 },
{ 'group': 8, 'variable': 8, 'value': 28 },
{ 'group': 8, 'variable': 9, 'value': 42 },
{ 'group': 8, 'variable': 10, 'value': 7 },
{ 'group': 9, 'variable': 1, 'value': 5 },
{ 'group': 9, 'variable': 2, 'value': 60 },
{ 'group': 9, 'variable': 3, 'value': 21 },
{ 'group': 9, 'variable': 4, 'value': 25 },
{ 'group': 9, 'variable': 5, 'value': 3 },
{ 'group': 9, 'variable': 6, 'value': 70 },
{ 'group': 9, 'variable': 7, 'value': 34 },
{ 'group': 9, 'variable': 8, 'value': 68 },
{ 'group': 9, 'variable': 9, 'value': 57 },
{ 'group': 9, 'variable': 10, 'value': 32 },
{ 'group': 9, 'variable': 1, 'value': 19 },
{ 'group': 9, 'variable': 2, 'value': 85 },
{ 'group': 9, 'variable': 3, 'value': 53 },
{ 'group': 9, 'variable': 4, 'value': 45 },
{ 'group': 9, 'variable': 5, 'value': 71 },
{ 'group': 9, 'variable': 6, 'value': 64 },
{ 'group': 9, 'variable': 7, 'value': 4 },
{ 'group': 9, 'variable': 8, 'value': 12 },
{ 'group': 9, 'variable': 9, 'value': 97 },
{ 'group': 9, 'variable': 10, 'value': 72 },
{ 'group': 10, 'variable': 9, 'value': 32},
];

    const addHeatmap = () => {

        heatmap(datax,["group"],["variable"],["value"]);
    }
    
    const addScptMatrix = () => {
        scpMatrix(data,
            ["species", "culmen_length_mm", "culmen_depth_mm", "flipper_length_mm", "body_mass_g"]
            , "species");
    }


    const addForceDirected = () => {
        forceDirected(graphData);
    }

{/* <div class="force">
    <p><label><input type="checkbox" checked onchange="forceProperties.charge.enabled = this.checked; updateAll();"> charge</label> Attracts (+) or repels (-) nodes to/from each other.</p>
    <label title="Negative strength repels nodes. Positive strength attracts nodes.">
                                    strength
      <output id="charge_StrengthSliderOutput">-30</output>
                                    <input type="range" min="-200" max="50" value="-30" step=".1" oninput="d3.select('#charge_StrengthSliderOutput').text(value); forceProperties.charge.strength=value; updateAll();">
    </label>
    <label title="Minimum distance where force is applied">
                                        distanceMin
      <output id="charge_distanceMinSliderOutput">1</output>
                                        <input type="range" min="0" max="50" value="1" step=".1" oninput="d3.select('#charge_distanceMinSliderOutput').text(value); forceProperties.charge.distanceMin=value; updateAll();">
    </label>
    <label title="Maximum distance where force is applied">
                                            distanceMax
      <output id="charge_distanceMaxSliderOutput">2000</output>
                                            <input type="range" min="0" max="2000" value="2000" step=".1" oninput="d3.select('#charge_distanceMaxSliderOutput').text(value); forceProperties.charge.distanceMax=value; updateAll();">
    </label>
</div> */}







	return (
		<div>
            <button onClick={() => addHeatmap()}>Aggiungi Heatmap</button>
			<button onClick={() => addGraph()}>Aggiungi scpt</button>
            <button onClick={() => addScptMatrix()}>Aggiungi scpt matrix</button>
            <button onClick={() => addForceDirected()}>Aggiungi forceDirected</button>
            <button onClick={() => updateStrength(-30)}>setForceToMinus30</button>
            <button onClick={() => updateStrength(-60)}>setForceToMinus60</button>
            <button onClick={() => updateDistanceMin(5)}>minDistanceTo5</button>
            <button onClick={() => updateDistanceMin(50)}>minDistanceTo50</button>
            <button onClick={() => updateDistanceMax(9)}>maxDistanceTo9</button>
            <button onClick={() => updateDistanceMax(500)}>maxDistanceTo500</button>

			<div id='prova'></div>
		</div>
	)



}






export default Prova; 