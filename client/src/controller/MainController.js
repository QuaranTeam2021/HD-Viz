
export default class MainController {

    constructor(model) {
        this.model = model;
    }

    parseCSV(file) {
        let matrix = [];
        let reader = new FileReader();
        if (file) {
            reader.readAsText(file, "UTF-8");
            reader.onload = () => {
                let text = reader.result;
                matrix = text.split('\n');
                for (let i = 0; i < matrix.length; ++i) {
                    matrix[i] = matrix[i].split(',');
                }
                this.model.setOriginalData = matrix;
            };
            reader.onerror = () => {
                console.log("Error reading file in controller");
            };
        }
    }

}

 