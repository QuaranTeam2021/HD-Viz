/* eslint-disable class-methods-use-this */

export default class AlgorithmStrategy {

    constructor() {
        if (this.constructor === AlgorithmStrategy) 
            throw new Error("Can't instantiate abstract class!");
    }

    compute() {
        // astratto
    }
}