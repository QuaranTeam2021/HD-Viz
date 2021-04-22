
export default class StandardGraphController {

    constructor() {
        if (this.constructor === StandardGraphController) 
            throw new Error("Can't instantiate abstract class!");
    }
}