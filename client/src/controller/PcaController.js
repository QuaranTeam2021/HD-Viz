import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class PcaController extends StandardGraphController {

    constructor(store) {
        super();
        this.store = store;
    }

    createGraph(graphId, type, features) {
        let data = this.store.calculateSelectedData(features);
        let graph = new StandardGraph(graphId, type, data);
        this.store.addGraph(graph);
    }
}