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

    createGraph(graphId, type, features, grouper, normalize = true) {
        let parameters = new UmapParameters(this._dimensions, this._neighbors);
        let reducedData = this.store.calculateReduction(features, this.umap, parameters, normalize);
        let grouperCol = this.store.calculateSelectedData(grouper).flat();
        for (let i = 0; i < reducedData.length; ++i) {
            reducedData[i].push(grouperCol[i]);
        }
        let graph = new StandardGraph(graphId, type, grouper.toString(), features, reducedData);
        this.store.addGraph(graph);
    }

    set neighbors(neighbors) {
        this._neighbors = neighbors;
    }
}

export const UmapControllerContext = createContext(UmapController);
export const useUmapController = () => useContext(UmapControllerContext);