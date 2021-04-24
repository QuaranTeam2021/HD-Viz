import React, { useCallback, useEffect, useRef, useState } from 'react';
import { action } from 'mobx';
import ButtonConfirm from './startUpOptions/ButtonConfirm';
import CheckboxColumns from './startUpOptions/CheckboxColumns';
import FASTMAPfeatures from './algorithms/FASTMAPfeatures';
import Insert from './startUpOptions/chooseDataset/Insert';
import ISOUMAPLLEfeatures from './algorithms/ISOUMAPLLEfeatures';
import { Link } from 'react-router-dom';
import PCAfeatures from './algorithms/PCAfeatures';
import RadioAlgorithm from './algorithms/RadioAlgorithm';
import RadioDistance from './startUpOptions/RadioDistance';
import RadioGraphType from './startUpOptions/RadioGraphType';
import TooltipDistColumns from './startUpOptions/TooltipDistColumns';
import TooltipVizColumns from './startUpOptions/TooltipVizColumns';
import TSNEfeatures from './algorithms/TSNEfeatures';
import { useFastmapController } from '../../controller/FastmapController';
import { useIsomapController } from '../../controller/IsomapController';
import { useLleController } from '../../controller/LleController';
import { useMainController } from '../../controller/MainController';
import { usePcaController } from '../../controller/PcaController';
import { useStandardController } from '../../controller/StandardController';
import { useTsneController } from '../../controller/TsneController';
import { useUmapController } from '../../controller/UmapController';

const needsAlgorithm = g => ["scptMat", "scp", "malp"].includes(g);
const needsDistance = g => ["htmp", "frcfld"].includes(g);
const selectedInsert = i => i.name !== undefined;

export default function BuildGraph({ defineStore }) {
  const [selectedGraph, setGraph] = useState('');
  const [insert, setInsert] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [size, setSize] = useState(5);
  const [distanza, setDistanza] = useState('');
  const [neighbours, setNeighbours] = useState(200);
  const [perplexity, setPerplexity] = useState(20);
  const [selectedAlgorithm, setAlgorithm] = useState('');

  /* Controller
     Quelli degli algoritmi sono spostabili in RadioAlgorithm */
  const mainController = useMainController();
  const fastmapController = useFastmapController();
  const isomapController = useIsomapController();
  const lleController = useLleController();
  const pcaController = usePcaController();
  const standardController = useStandardController();
  const tsneController = useTsneController();
  const umapController = useUmapController();
  const algorithmController = useRef({});
  const setAlgorithmController = useCallback(alg => {
    switch (alg) {
      case "PCA":
        algorithmController.current = pcaController;
        break;
      case "UMAP":
        algorithmController.current = umapController;
        break;
      case "FASTMAP":
        algorithmController.current = fastmapController;
        break;
      case "ISOMAP":
        algorithmController.current = isomapController;
        break;
      case "T-SNE":
        algorithmController.current = tsneController;
        break;
      case "LLE":
        algorithmController.current = lleController;
        break;
      default:
        algorithmController.current = standardController;
        break;
    }
    console.log(algorithmController);
  }, [fastmapController, isomapController, lleController, pcaController, standardController, tsneController, umapController]);

  useEffect(() => {
    setAlgorithmController(selectedAlgorithm);
  }, [])


  const allOptionsSelected = useCallback(() => {
    let allSelected;
    allSelected = insert !== "";
    allSelected = allSelected && selectedGraph !== "";
    allSelected = allSelected && selectedColumns.length > 0;
    if (needsDistance(selectedGraph))
      allSelected = allSelected && distanza !== "";
    if (needsAlgorithm(selectedGraph)) {
      if (["PCA", "UMAP", "ISOMAP", "LLE", "FASTMAP", "T-SNE", "none"].includes(selectedAlgorithm))
        allSelected = allSelected && size >= 2 && size <= 10;
      else
        allSelected = false;
    }
    setConfirm(allSelected);
  }, [insert, selectedGraph, selectedColumns.length, distanza, selectedAlgorithm, size]);

  useEffect(() => {
    allOptionsSelected();
  }, [allOptionsSelected]);

  // Abilita reindirizzamento da Visualization
  useEffect(() => {
    defineStore(false);
  }, [defineStore]);

  const onChangeGraph = e => {
    setGraph(e.target.value);
  };

  const onChangeInsert = e => {
    let v = e.target.files[0];
    if (v !== undefined) {
      setInsert(v);
      mainController.parse(v);
    }
  };

  const onChangeAlgorithm = (_e, v) => {
    setAlgorithm(v);
    setAlgorithmController(v);
  };

  const onChangeSize = (_e, v) => {
    setSize(v);
    algorithmController.current.dimensions = v;
  };

  const onChangeNeighbours = (_e, v) => {
    setNeighbours(v);
    algorithmController.current.neighbors = v;
  };

  const onChangePerplexity = (_e, v) => {
    setPerplexity(v);
    algorithmController.current.perplexity = v;
  };

  const onChangeDistanza = (_e, v) => {
    setDistanza(v);
    algorithmController.current.dimensions = v; // per tutti tranne pca manca parametro distanza
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
    pcaController.createGraph(`${selectedGraph}-${Math.round(Math.random() * 100)}`, selectedGraph, selectedColumns);
    defineStore(true);
  });

  return (

    <div className="BuildGraph" >
      <div id="intestazione"><h2>Benvenuto in HD-VIZ! La miglior applicazione di grafici dimensionali!</h2></div>
      <div id="inserimento"> {!selectedInsert(insert) && <p>Inserisci qui i tuoi dati</p>}
        <Insert onChange={onChangeInsert} fileName={insert.name} />
      </div>
      <div id="selezione">
        <div id="impostazioni">
          {selectedInsert(insert) && <RadioGraphType onChange={onChangeGraph} />}
          <div id="colonne">
            {selectedInsert(insert) && <CheckboxColumns onChange={onChangeColumns} />}
          </div>
          <div id="question">
            {needsDistance(selectedGraph) && <TooltipDistColumns />}
            {needsAlgorithm(selectedGraph) && <TooltipVizColumns />}
          </div>
          {["scptMat", "malp", "scp"].includes(selectedGraph) && <RadioAlgorithm onChange={onChangeAlgorithm} />}
          {needsDistance(selectedGraph) && <RadioDistance onChange={onChangeDistanza} distanza={distanza} />}
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
            }} />}
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