import { createContext, useContext } from 'react';
import { autorun } from "mobx";

export default class MainController {

    constructor(model) {
        this.model = model; 
    }

    setInsert(insertForm) {
        this.insert = insertForm;
        autorun(() => this.parse(this.insert));
    }

    setSelectedFeatures(selected) {
        this.selected = selected;
    }

    parse(file) {
        if (file && file.size > 0) {
            let name = file.name;
            name = name.split('.');
            let ext = name[1];
            switch (ext) {
                case 'csv': this.parseCsv(file);
                    break;
                case 'json': 
                    break;
                case 'tsv':
                    break;
                default:
                    break;
            }
        }
    }

    parseCsv(file) {
        let matrix = [];
        let reader = new FileReader();
        if (file && file.size > 0) {
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

export const MainControllerContext = createContext(MainController);
export const useMainController = () => useContext(MainControllerContext);

 