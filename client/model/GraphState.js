
/**
 * Usiamo questa classe per creare istanze che controllano 
 * lo stato di ogni grafico
 */
class GraphState {

    /**
     * Constructor injection
     * @param {*} graph => Oggetto classe Graph
     * @param {*} algorithm => string
     * @param {*} selectedFeatures => array di dimensioni selezionate
     */
    constructor(graph, algorithm, selectedFeatures) {
        this.graph;
        this.algorithm = algorithm;
        this.selectedFeatures = selectedFeatures;
    }

    setGraph(graph) {
        this.graph = graph;
    }

    setAlgorithm(algorithm) {
        this.algorithm = algorithm;
    }

    setSelectedFeatures(selectedFeatures) {
        this.selectedFeatures = selectedFeatures;
    }

    getGraph() {
        return this.Graph;
    }

    getAlgorithm() {
        return this.Algorithm;
    }

    getSelectedFeatures() {
        return this.selectedFeatures;
    }
}

exports.GraphState = GraphState;