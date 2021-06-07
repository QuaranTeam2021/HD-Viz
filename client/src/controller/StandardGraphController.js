
export default class StandardGraphController {

    dimensions = null;

    constructor() {
        if (this.constructor === StandardGraphController) 
            throw new Error("Can't instantiate abstract class!");
    }

    set dimensions(dimensions) {
        this._dimensions = dimensions;
    }
}