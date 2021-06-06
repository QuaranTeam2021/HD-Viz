/* eslint-disable max-lines */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { action } from 'mobx';
import ButtonConfirm from './startUpOptions/ButtonConfirm';
import Columns from './startUpOptions/columns/Columns';
import FASTMAPfeatures from './algorithms/FASTMAPfeatures';
import Insert from './startUpOptions/chooseDataset/Insert';
import ISOMAPLLEfeatures from './algorithms/ISOMAPLLEfeatures';
import ModalDb from './database/ModalDb';
import RadioAlgorithm from './algorithms/RadioAlgorithm';
import RadioDistance from './startUpOptions/RadioDistance';
import RadioGraphType from './startUpOptions/RadioGraphType';
import TooltipConfirm from './startUpOptions/TooltipConfirm';
import TooltipDistColumns from './startUpOptions/columns/TooltipDistColumns';
import TooltipVizColumns from './startUpOptions/columns/TooltipVizColumns';
import TSNEfeatures from './algorithms/TSNEfeatures';
import UMAPfeatures from './algorithms/UMAPfeatures';
import { useDistanceBasedGraphController } from '../../controller/DistanceBasedGraphController';
import { useFastmapController } from '../../controller/FastmapController';
import { useIsomapController } from '../../controller/IsomapController';
import { useLleController } from '../../controller/LleController';
import { useLocalLoaderController } from '../../controller/LocalLoaderController';
import { useStandardController } from '../../controller/StandardController';
import { useTsneController } from '../../controller/TsneController';
import { useUmapController } from '../../controller/UmapController';

const needsAlgorithm = g => ["scptMat", "malp"].includes(g);
const needsDistance = e => ["htmp", "frcfld"].includes(e) || ["FASTMAP", "ISOMAP", "T-SNE", "LLE"].includes(e);
const selectedInsert = i => i.name !== undefined;
const maxColumns = s => s === "scptMat";

export default function BuildGraph() {
  const [selectedGraph, setGraph] = useState('');
  const [insert, setInsert] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [grouper, setGrouper] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [size, setSize] = useState(5);
  const [distanza, setDistanza] = useState('');
  const [neighbours, setNeighbours] = useState(200);
  const [perplexity, setPerplexity] = useState(20);
  const [epsilon, setEpsilon] = useState(20);
  const [selectedAlgorithm, setAlgorithm] = useState('');
  const [parseResult, setParseResult] = useState();

  /* Controller
     Quelli degli algoritmi sono spostabili in RadioAlgorithm */
  const localLoaderController = useLocalLoaderController();
  const fastmapController = useFastmapController();
  const isomapController = useIsomapController();
  const lleController = useLleController();
  const standardController = useStandardController();
  const tsneController = useTsneController();
  const umapController = useUmapController();

  const distanceBasedGraphController = useDistanceBasedGraphController();

  const controller = useRef(standardController);
  const setAlgorithmController = useCallback(alg => {
    switch (alg) {
      case "UMAP":
        controller.current = umapController;
        break;
      case "FASTMAP":
        controller.current = fastmapController;
        break;
      case "ISOMAP":
        controller.current = isomapController;
        break;
      case "T-SNE":
        controller.current = tsneController;
        break;
      case "LLE":
        controller.current = lleController;
        break;
      default:
        controller.current = standardController;
        break;
    }
  }, [fastmapController, isomapController, lleController, standardController, tsneController, umapController]);

  const allOptionsSelected = useCallback(() => {
    let allSelected;
    allSelected = insert !== "";
    allSelected = allSelected && selectedGraph !== "";
    allSelected = allSelected && selectedColumns.length > 0;
    if (maxColumns(selectedGraph)) {
      allSelected = allSelected && selectedColumns.length < 6;
    }
    if (needsDistance(selectedGraph) || needsDistance(selectedAlgorithm))
      allSelected = allSelected && distanza !== "";
    if (needsAlgorithm(selectedGraph)) {
      if (["UMAP", "ISOMAP", "LLE", "FASTMAP", "T-SNE", "none"].includes(selectedAlgorithm))
        allSelected = allSelected && size >= 2 && size <= 10;
      else
        allSelected = false;
    }
    setConfirm(allSelected);
  }, [insert, selectedGraph, selectedColumns.length, distanza, selectedAlgorithm, size]);

  useEffect(() => {
    allOptionsSelected();
  }, [allOptionsSelected]);

  const onChangeGraph = (_e, v) => {
    console.log(_e)
    setGraph(v);
    if (needsDistance(v))
      controller.current = distanceBasedGraphController;
  };

  const onChangeInsert = async e => {
    let v = e.target.files[0];
    if (v !== undefined) {
      setInsert(v);
      try {
        let res = await localLoaderController.parse(v);
        console.log(res);
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const onChangeAlgorithm = (_e, v) => {
    setAlgorithm(v);
    setAlgorithmController(v);
  };

  const onChangeSize = (_e, v) => {
    setSize(v);
    controller.current.dimensions = v;
  };

  const onChangeNeighbours = (_e, v) => {
    setNeighbours(v);
    controller.current.neighbors = v;
  };

  const onChangePerplexity = (_e, v) => {
    setPerplexity(v);
    controller.current.perplexity = v;
  };

  const onChangeEpsilon = (_e, v) => {
    setEpsilon(v);
    controller.current.epsilon = v;
  }

  const onChangeDistanza = (_e, v) => {
    setDistanza(v);
    controller.current.metric = v;
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

  const onChangeGrouper = (_e, v) => setGrouper(() => {
    let gr = [];
    gr.push(v);
    return gr;
  });

  const onClickConfirm = action(() => {
    let formData = {
      insert,
      selectedColumns,
      selectedGraph
    };
    if (needsDistance(selectedGraph)) {
      formData.distanza = distanza;
      controller.current.createGraph(`${selectedGraph}-${Math.round(Math.random() * 100)}`, selectedGraph, distanza, selectedColumns, grouper);
    }
    if (needsAlgorithm(selectedGraph)) {
      if (["UMAP", "ISOMAP", "LLE", "FASTMAP", "T-SNE"].includes(selectedAlgorithm))
        formData.distanza = distanza;
      if (["UMAP", "ISOMAP", "LLE", "T-SNE"].includes(selectedAlgorithm))
        formData.neighbours = neighbours;
      if (["T-SNE"].includes(selectedAlgorithm)) {
        formData.perplexity = perplexity;
        formData.epsilon = epsilon;
      }
      controller.current.createGraph(`${selectedGraph}-${Math.round(Math.random() * 100)}`, selectedGraph, selectedColumns, grouper);
    }
    console.log(formData);
  });

  let showDimMode = {};

  if (["none"].includes(selectedAlgorithm)) {
    showDimMode.display = "initial";
  }

  return (

    <div className="BuildGraph" >
      <div id="inserimento"> {!selectedInsert(insert) && <p>Importa qui i tuoi dati</p>}
        <div className="uploadButton">
          <Insert onChange={onChangeInsert} fileName={insert.name} />
          <ModalDb onSubmit={insertTab => setInsert(insertTab)}/>
        </div>
      </div>
      <div id="selezione">
        <div id="impostazioni">
          {selectedInsert(insert) && <RadioGraphType onChange={onChangeGraph} />}
          
          {selectedInsert(insert) && <Columns onChangeUploaded={onChangeColumns} onChangeGrouper={onChangeGrouper}/>}
          {needsDistance(selectedGraph) && <TooltipDistColumns />}
          {needsAlgorithm(selectedGraph) && <TooltipVizColumns />}

          {["scptMat", "malp"].includes(selectedGraph) && <RadioAlgorithm onChange={onChangeAlgorithm} />}
          {needsDistance(selectedGraph) && <RadioDistance onChange={onChangeDistanza} distanza={distanza} />}
          <div id="FeaturesAlgorithm">
            <div id="FeaturesAlgorithm2">
              {needsAlgorithm(selectedGraph) && ["ISOMAP", "LLE"].includes(selectedAlgorithm) && <ISOMAPLLEfeatures attributes={{
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
            <div id="FeaturesAlgorithm4">
              {needsAlgorithm(selectedGraph) && ["T-SNE"].includes(selectedAlgorithm) && <TSNEfeatures attributes={{
                d: {
                  distanza,
                  onChangeDistanza
                },
                e: {
                  epsilon,
                  onChangeEpsilon
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
            <div id="FeaturesAlgorithm5">
              {needsAlgorithm(selectedGraph) && ["UMAP"].includes(selectedAlgorithm) && <UMAPfeatures attributes={{
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
          </div>
        </div>
        <div id="ButtonConfirm">
          {selectedInsert(insert) && <ButtonConfirm onClick={onClickConfirm} disabled={!confirm} /> } 
          {selectedInsert(insert) && <TooltipConfirm />}
        </div>
      </div>
    </div>
  );
}