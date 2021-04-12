import React, { useState } from 'react';
import { action } from 'mobx'
import ButtonConfirm from './ButtonConfirm';
import ContainerFeaturesFF from './ContainerFeaturesFF'; 
import FASTMAPfeatures from './FASTMAPfeatures';
import Insert from './Insert';
import ISOUMAPLLEfeatures from './ISOUMAPLLEfeatures';
import PCAfeatures from './PCAfeatures';
import SelectAlgorithm from './SelectAlgorithm';
import SelectColumns from './SelectColumns';
import SelectDimensione from './SelectDimensione';
import SelectGraph from './SelectGraph';
import TSNEfeatures from './TSNEfeatures';
import { useMainController } from '../../controller/MainController';

export default function GraphOption() {
  const [selectedGraph, setGraph] = useState(''); 
  const [insert, setInsert] = React.useState([]);
  const [insertReadResult, setInsertReadResult] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [confirm, setConfirm] = useState([]);
  const setSize = useState('')[1];
  const [selectedAlgorithm, setAlgorithm] = useState('');
  const setDimensione = useState('')[1];
  const mainController = useMainController();
  mainController.setInsert(insert);

  const onChangeGraph = e => {
    setGraph(e.target.value);
  };

  const onChangeInsert = action(e => {
    setInsert(e.target.files[0]);
  })

  const onClickInsert = e => {
    e.target.value = null;
    setInsertReadResult("");
  };

  const onChangeAlgorithm = e => {
    setAlgorithm(e.target.value);
  };

  const onChangeDimensione = e => {
    setDimensione(e.target.value);
  };

  const onChangeColumns = e => {
    let actual = selectedColumns;
    if (e.target.checked) {
      actual.push(e.target.value);
      setSelectedColumns(actual);
    } else {
      actual = actual.filter(d => d !== e.target.value);
      setSelectedColumns(actual);
    }
  } 
  
  const onClickConfirm = action(e => {
    setConfirm(e.target.files[0]);
  }) 

  const onChangeConfirm = e => {
    setConfirm(e.target.value);
    setGraph("");
  } 

  
  return (
    
    <div className="GraphOption" >
      <Insert onChange={onChangeInsert} fileName={insert.name} onClick={onClickInsert} />
      {insert && insertReadResult}
      <SelectGraph onChange={onChangeGraph} />
      {["Scatterplot Matrix", "Proiezione Multiassi", "Scatterplot"].includes(selectedGraph) && <SelectAlgorithm onChange={onChangeAlgorithm} /> }
      {["HeatMap", "Force Field"].includes(selectedGraph) && <SelectDimensione onChange={onChangeDimensione} /> }
      
      <SelectColumns onChange={onChangeColumns} />
      
      <ButtonConfirm onChange={onClickConfirm} fileName={confirm.name} />
      {["Force Field"].includes(setGraph) && <ContainerFeaturesFF />}
      <ContainerFeaturesFF />
      {["PCA"].includes(selectedAlgorithm) && <PCAfeatures />}
      {["UMAP", "ISOMAP", "LLE"].includes(selectedAlgorithm) && <ISOUMAPLLEfeatures />}
      {["FASTMAP"].includes(selectedAlgorithm) && <FASTMAPfeatures />}
      {["T-SNE"].includes(selectedAlgorithm) && <TSNEfeatures />}
      
      
    </div>
  );
}