import React, { useCallback, useEffect, useState } from 'react';
import { action } from 'mobx';
import ButtonConfirm from './ButtonConfirm'
import FASTMAPfeatures from './FASTMAPfeatures';
import Insert from './Insert';
import ISOUMAPLLEfeatures from './ISOUMAPLLEfeatures';
import { Link } from 'react-router-dom';
import PCAfeatures from './PCAfeatures';
import SelectAlgorithm from './SelectAlgorithm';
import SelectColumns from './SelectColumns';
import SelectDistanza from './SelectDistanza';
import SelectGraph from './SelectGraph';
import TooltipColonne2 from './TooltipColonne2'
import TooltipColumns from './TooltipColumns'
import TSNEfeatures from './TSNEfeatures';
import { useMainController } from '../../controller/MainController';

const needsAlgorithm = g => ["Scatterplot Matrix", "Scatterplot", "Proiezione Multiassi"].includes(g);
const needsDistance = g => ["HeatMap", "Force Field"].includes(g);
const selectedInsert = i => i.name !== undefined; 
 

export default function GraphOption() {
  const [selectedGraph, setGraph] = useState('');
  const [insert, setInsert] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [size, setSize] = useState(5);
  const [distanza, setDistanza] = useState('');
  const [neighbours, setNeighbours] = useState(200);
  const [perplexity, setPerplexity] = useState(20);
  const [selectedAlgorithm, setAlgorithm] = useState('');
  const mainController = useMainController();
  mainController.setInsert(insert);

  const allOptionsSelected = useCallback(() => {
    let allSelected;
    allSelected = insert !== "";
    allSelected = allSelected && selectedGraph !== "";
    allSelected = allSelected && selectedColumns.length > 0;
    if (needsDistance(selectedGraph))
      allSelected = allSelected && distanza !== "";
    if (needsAlgorithm(selectedGraph)) {
      if (["UMAP", "ISOMAP", "LLE", "FASTMAP", "T-SNE"].includes(selectedAlgorithm))
        allSelected = allSelected && distanza !== "";
      else
        allSelected = false;
    }
    setConfirm(allSelected);
  }, [insert, selectedGraph, selectedColumns.length, distanza, selectedAlgorithm]);

  useEffect(() => {
    allOptionsSelected();
  }, [allOptionsSelected]);


  const onChangeGraph = e => {
    setGraph(e.target.value);
  };

  const onChangeInsert = action(e => setInsert(prev => {
    let v = e.target.files[0];
    return v === undefined ? prev : v;
  }));

  const onChangeAlgorithm = (_e, v) => setAlgorithm(v);

  const onChangeSize = (_e, v) => setSize(v);

  const onChangeNeighbours = (_e, v) => setNeighbours(v);

  const onChangePerplexity = (_e, v) => setPerplexity(v);

  const onChangeDistanza = (_e, v) => setDistanza(v);

  const onChangeColumns = e => {
    let actual = selectedColumns;
    if (e.target.checked) {
      actual.push(e.target.value);
      setSelectedColumns(actual);
    } else {
      actual = actual.filter(d => d !== e.target.value);
      setSelectedColumns(actual);
    }
    allOptionsSelected();
  };

  const onClickConfirm = action(() => {
    let formData = {
      insert,
      selectedColumns,
      selectedGraph
    };
    if (needsDistance(selectedGraph))
      formData.distanza = distanza;
    if (needsAlgorithm(selectedGraph)) {
      if (["UMAP", "ISOMAP", "LLE", "FASTMAP", "T-SNE"].includes(selectedAlgorithm))
        formData.distanza = distanza;
      if (["UMAP", "ISOMAP", "LLE", "T-SNE"].includes(selectedAlgorithm))
        formData.neighbours = neighbours;
      if (["T-SNE"].includes(selectedAlgorithm))
        formData.perplexity = perplexity;
    }
    console.log(formData);
  });

  return (

    <div className="GraphOption" >
      <div id="intestazione"><h2>Benvenuto in HD-VIZ! La miglior applicazione di grafici dimensionali!</h2></div>
       <div id="inserimento"> {!selectedInsert(insert) && <p>Inserisci qui i tuoi dati</p>}
          <Insert onChange={onChangeInsert} fileName={insert.name} /> 
        </div>
        <div id="selezione">
          <div id="impostazioni">
            { selectedInsert(insert) && <SelectGraph onChange={onChangeGraph}/> }
            <div id="colonne"> 
              { needsAlgorithm(selectedGraph) && <SelectColumns onChange={onChangeColumns} />} 
              { needsDistance(selectedGraph) && <SelectColumns onChange={onChangeColumns} />}
            </div>
            <div id="question">
            { needsDistance(selectedGraph) && <TooltipColumns/>}
            { needsAlgorithm(selectedGraph) && <TooltipColonne2/>}
            </div>
            {["Scatterplot Matrix", "Proiezione Multiassi", "Scatterplot"].includes(selectedGraph) && <SelectAlgorithm onChange={onChangeAlgorithm} />}
            {needsDistance(selectedGraph) && <SelectDistanza onChange={onChangeDistanza} distanza={distanza} />}
            <div id="FeaturesAlgorithm">  
              <div className="dimensione">
                {needsAlgorithm(selectedGraph) && ["PCA"].includes(selectedAlgorithm) && <PCAfeatures attributes={{
                onChangeSize,
                size
                }} />} 
              </div> 
              <div id="FeaturesAlgorithm2">
              {needsAlgorithm(selectedGraph) && ["UMAP", "ISOMAP", "LLE"].includes(selectedAlgorithm) && <ISOUMAPLLEfeatures attributes={{
              d: {
              distanza,
              onChangeDistanza
             },
              n: {
                neighbours,
                onChangeNeighbours
               },
              s: {
                 onChangeSize,
                size
              }
            }} />} 
            </div>
            <div id="FeaturesAlgorithm3">
            {needsAlgorithm(selectedGraph) && ["FASTMAP"].includes(selectedAlgorithm) && <FASTMAPfeatures attributes={{
              d: {
                distanza,
                onChangeDistanza
                },
              s: {
              onChangeSize,
              size
              }
               }} />}
            </div>
            {needsAlgorithm(selectedGraph) && ["T-SNE"].includes(selectedAlgorithm) && <TSNEfeatures attributes={{
              d: {
              distanza,
              onChangeDistanza
              },
              n: {
              neighbours,
              onChangeNeighbours
              },
              p: {
              onChangePerplexity,
              perplexity
              },
              s: {
              onChangeSize,
              size
              }
              }}/>}
            </div>
          </div>
        
          
      </div>
      <Link to="/visualization" >
        <div id="ButtonConfirm">
          {selectedInsert(insert) && <ButtonConfirm onClick={onClickConfirm} disabled={!confirm} />}
        </div>
      </Link>
    </div>
  );
}