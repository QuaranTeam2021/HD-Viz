import React, { useCallback, useEffect, useState } from 'react';
import { action } from 'mobx';
import ButtonConfirm from './ButtonConfirm';
import ContainerFeaturesFF from './ContainerFeaturesFF';
import FASTMAPfeatures from './FASTMAPfeatures';
import Insert from './Insert';
import ISOUMAPLLEfeatures from './ISOUMAPLLEfeatures';
import PCAfeatures from './PCAfeatures';
import SelectAlgorithm from './SelectAlgorithm';
import SelectColumns from './SelectColumns';
import SelectDistanza from './SelectDistanza';
import SelectGraph from './SelectGraph';
import TSNEfeatures from './TSNEfeatures';
import { useMainController } from '../../controller/MainController';

const needsAlgorithm = g => ["Scatterplot Matrix", "Scatterplot", "Proiezione Multiassi"].includes(g);
const needsDistance = g => ["HeatMap", "Force Field"].includes(g);

export default function GraphOption() {
  const [selectedGraph, setGraph] = useState('');
  const [insert, setInsert] = useState([]);
  const [insertReadResult, setInsertReadResult] = useState('');
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

  const onChangeGraph = e => setGraph(e.target.value);

  const onChangeInsert = action(e => setInsert(e.target.files[0]));

  const onClickInsert = e => {
    e.target.value = null;
    setInsertReadResult("");
  };

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
      <Insert onChange={onChangeInsert} fileName={insert.name} onClick={onClickInsert} />
      <SelectGraph onChange={onChangeGraph} />
      {["Scatterplot Matrix", "Proiezione Multiassi", "Scatterplot"].includes(selectedGraph) && <SelectAlgorithm onChange={onChangeAlgorithm} />}
      {needsDistance(selectedGraph) && <SelectDistanza onChange={onChangeDistanza} distanza={distanza} />}

      <SelectColumns onChange={onChangeColumns} />

      <ButtonConfirm onClick={onClickConfirm} disabled={!confirm} />
      {needsAlgorithm(selectedGraph) && ["PCA"].includes(selectedAlgorithm) && <PCAfeatures attributes={{
        onChangeSize,
        size
      }} />}
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
  );
}