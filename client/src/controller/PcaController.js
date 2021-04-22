import PCA from '../store/Algorithm/PCA';
import PcaParameters from '../store/Parameters/PcaParameters';
import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class PcaController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
        this.PCA = new PCA();
        this.dimensions = null;
    }

    createGraph(graphId, type, features) {
        let data = this.store.calculateSelectedData(features);
        let params = new PcaParameters(this.dimensions, data);
        let reducedData = PCA.compute(params);
        let graph = new StandardGraph(graphId, type, reducedData);
        this.store.addGraph(graph);
    }

    set dimensions(dims) {
        this.dimensions = dims;
    }
}