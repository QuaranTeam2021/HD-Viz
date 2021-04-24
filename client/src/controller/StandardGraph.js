import StandardGraph from '../store/Graph/StandardGraph';
import StandardGraphController from './StandardGraphController';

export default class StandardController extends StandardGraphController {

    createGraph(graphId, type, features) {
        let data = this.store.calculateSelectedData(features);
        data = data.slice(1);
        let graph = new StandardGraph(graphId, type, data);
        this.store.addGraph(graph);
    }
}