import React, { useCallback, useEffect } from 'react';
import { action } from 'mobx';
import ButtonConfirm from './startUpOptions/ButtonConfirm';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckboxNormalisation from './startUpOptions/CheckboxNormalisation';
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

export const needsAlgorithm = g => ["scptMat", "malp"].includes(g);
export const needsDistance = e => ["htmp", "frcfld"].includes(e) || ["FASTMAP", "ISOMAP", "T-SNE", "LLE"].includes(e);
export const selectedInsert = i => i.name !== undefined;
const maxColumns = s => s === "scptMat";

export default function BuildGraph() {
  const [selectedGraph, setGraph] = React.useState('');
  const [insert, setInsert] = React.useState([]);
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [grouper, setGrouper] = React.useState('');
  const [confirm, setConfirm] = React.useState(false);
  const [size, setSize] = React.useState(2);
  const [distanza, setDistanza] = React.useState('');
  const [neighbours, setNeighbours] = React.useState(200);
  const [perplexity, setPerplexity] = React.useState(20);
  const [epsilon, setEpsilon] = React.useState(20);
  const [normalisation, setNormalisation] = React.useState(false);
  const [selectedAlgorithm, setAlgorithm] = React.useState('');
  const [parseResult, setParseResult] = React.useState(null);

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

  const controller = React.useRef(standardController);
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
    if (maxColumns(selectedGraph) && selectedAlgorithm === "none") {
      allSelected = allSelected && selectedColumns.length < 6;
    }
    if (needsAlgorithm(selectedGraph))
      allSelected = allSelected && selectedAlgorithm !== "";
    if (needsDistance(selectedGraph) || needsDistance(selectedAlgorithm))
      allSelected = allSelected && distanza !== "";
    setConfirm(allSelected);
  }, [insert, selectedGraph, selectedColumns.length, distanza, selectedAlgorithm]);

  useEffect(() => {
    allOptionsSelected();
  }, [allOptionsSelected]);

  const onChangeGraph = (_e, v) => {
    setGraph(v);
    if (needsDistance(v))
      controller.current = distanceBasedGraphController;
  };

  const onChangeInsert = async e => {
    let v = e.target.files[0];
    if (v !== undefined) {
      setInsert(v);
      try {
        await localLoaderController.parse(v);
        setSelectedColumns([]);
        setParseResult(null);
      } catch (err) {
        setInsert({ name: undefined });
        setParseResult(err.message ? err.message : err);
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
  };

  const onChangeDistanza = (_e, v) => {
    setDistanza(v);
    controller.current.metric = v;
  };

  const onChangeColumns = e => {
    setSelectedColumns(e.target.value); }

  const onChangeGrouper = (_e, v) => setGrouper(() => {
    let gr = [];
    gr.push(v);
    return gr;
  });

  const onChangeNormalisation = e => setNormalisation(e.target.checked);

  const onClickConfirm = action(() => {
    if (needsDistance(selectedGraph))
      controller.current.createGraph(`${selectedGraph}-${Math.round(Math.random() * 100)}`, selectedGraph, distanza, selectedColumns, grouper, normalisation);
    if (needsAlgorithm(selectedGraph))
      controller.current.createGraph(`${selectedGraph}-${Math.round(Math.random() * 100)}`, selectedGraph, selectedColumns, grouper, normalisation);
  });

  let showDimMode = {};

  if (["none"].includes(selectedAlgorithm)) {
    showDimMode.display = "initial";
  }

  return (

    <div className="BuildGraph" >
      <div id="inserimento">
        <fieldset className="uploadButton" aria-labelledby="insert-label">
          <legend className="buildgraph-legend" id="insert-label">Scelta del dataset</legend>
          <Insert onChange={onChangeInsert} fileName={insert.name} />
          <ModalDb onSubmit={insertTab => setInsert(insertTab)} />
        </fieldset>
      </div>
      {selectedInsert(insert) ? // eslint-disable-line operator-linebreak
        <div id="selezione">
          <div id="impostazioni">
            <fieldset className="buildgraph-fieldset" aria-labelledby="columns-label">
              <legend className="buildgraph-legend" id="columns-label">Colonne da utilizzare</legend>
              <div className="div-colonne">
                <Columns onChangeUploaded={onChangeColumns} onChangeGrouper={onChangeGrouper} selectedColumns={selectedColumns} />
                {(needsDistance(selectedGraph) || selectedAlgorithm !== "none") && <TooltipDistColumns />}
                {needsAlgorithm(selectedGraph) && selectedAlgorithm === "none" && <TooltipVizColumns />}
              </div>
              <CheckboxNormalisation onChangeNormalisation={onChangeNormalisation} />
            </fieldset>
            <fieldset className="buildgraph-fieldset" aria-labelledby="graph-options-label">
              <legend className="buildgraph-legend" id="graph-option-label">Parametri di visualizzazione</legend>
              <RadioGraphType onChange={onChangeGraph} />
              {["scptMat", "malp"].includes(selectedGraph) && <RadioAlgorithm onChange={onChangeAlgorithm} algorithm={selectedAlgorithm} />}
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
            </fieldset>
          </div>
            <div id="ButtonConfirm">
              {selectedInsert(insert) && <ButtonConfirm onClick={onClickConfirm} disabled={!confirm} />}
              {selectedInsert(insert) && <TooltipConfirm />}
            </div>
        </div>
        : parseResult &&
        <Card variant="outlined" className="error message">
          <CardContent>
            {parseResult}
          </CardContent>
        </Card>
      }
    </div>
  );
}