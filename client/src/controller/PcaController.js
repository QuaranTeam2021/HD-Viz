import { createContext, useContext } from 'react';
import PCA from '../store/Algorithm/PCA';
import PcaParameters from '../store/Parameters/PcaParameters';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class PcaController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
        this.pca = new PCA();
        this.dimensions = null;
    }

    createGraph(graphId, type, features) {
        let data = this.store.calculateSelectedData(features);
        data = data.slice(1);
        let params = new PcaParameters(this.dimensions, data);
        let reducedData = this.pca.compute(params);
        let graph = new StandardGraph(graphId, type, reducedData);
        this.store.addGraph(graph);
    }
}

export const PcaControllerContext = createContext(PcaController);
export const usePcaController = () => useContext(PcaControllerContext);