import { createContext, useContext } from 'react';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';
import TSNE from '../store/Algorithm/TSNE';
import TsneParameters from '../store/Parameters/TsneParameters';

export default class TsneController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
        this.tsne = new TSNE();
        this.perplexity = null;
        this.epsilon = null;
        this.metric = null;
    }

    createGraph(graphId, type, features, grouper, normalize = true) {
        let parameters = new TsneParameters(this._dimensions, this._perplexity, this._epsilon, this._metric);
        let reducedData = this.store.calculateReduction(features, this.tsne, parameters, normalize);
        let grouperCol = this.store.calculateSelectedData(grouper).flat();
        for (let i = 0; i < reducedData.length; ++i) {
            reducedData[i].push(grouperCol[i]);
        }
        let graph = new StandardGraph(graphId, type, grouper.toString(), features, reducedData);
        this.store.addGraph(graph);
    }
    
    set perplexity(perplexity) {
        this._perplexity = perplexity;
    }

    set epsilon(epsilon) {
        this._epsilon = epsilon;
    }

    set metric(metric) {
        this._metric = metric;
    }
}

export const TsneControllerContext = createContext(TsneController);
export const useTsneController = () => useContext(TsneControllerContext);