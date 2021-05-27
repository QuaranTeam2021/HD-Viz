import { createContext, useContext } from 'react';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';
import UMAP from '../store/Algorithm/UMAP';
import UmapParameters from '../store/Parameters/UmapParameters';

export default class UmapController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
        this.umap = new UMAP();
        this.neighbors = null;
    }

    createGraph(graphId, type, features, grouper) {
        let parameters = new UmapParameters(this._dimensions, this._neighbors);
        let reducedData = this.store.calculateReduction(features, this.umap, parameters);
        let grouperCol = this.store.calculateSelectedData(grouper).flat();
        for (let i = 0; i < reducedData.length; ++i) {
            reducedData[i].push(grouperCol[i]);
        }
        let graph = new StandardGraph(graphId, type, grouper.toString(), features, reducedData);
        this.store.addGraph(graph);
    }

    calculateReduction(graphId, features) {
        let parameters = new UmapParameters(this._dimensions, this._neighbors);
        let reducedData = this.store.calculateReduction(features, this.umap, parameters);
        let updatedGraph = this.store.getGraphById(graphId);
        updatedGraph.data = reducedData;
        let index = this.store.getGraphIndexById(graphId);
        this.store.graphs[index] = updatedGraph;
    }

    set neighbors(neighbors) {
        this._neighbors = neighbors;
    }
}

export const UmapControllerContext = createContext(UmapController);
export const useUmapController = () => useContext(UmapControllerContext);