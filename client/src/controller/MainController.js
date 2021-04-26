import { createContext, useContext } from 'react';
import Papa from 'papaparse';

export default class MainController {

    constructor(store) {
        this.store = store; 
    }

    parse(file) {
        if (file && file.size > 0) {
            let name = file.name;
            name = name.split('.');
            let ext = name[1];
            switch (ext) {
                case 'csv': this.parseWithDelimiter(file, ',');
                    break;
                case 'json': this.parseJson(file);
                    break;
                case 'tsv': this.parseWithDelimiter(file, '\t');
                    break;
                default:
                    break;
            }
        }
    }

    parseJson(file) {
        let reader = new FileReader();
        if (file && file.size > 0) {
            reader.readAsText(file, "UTF-8");
            reader.onload = () => {
                let csv = Papa.unparse(reader.result);
                let result = Papa.parse(csv, {
                    delimiter: ',',
                    dynamicTyping: true,
                    error(error) {
                        throw new Error(error);
                    }
                })
                this.store.originalData = result.data;
                let features = new Map();
                for (let i = 0; i < result.data[0].length; ++i) {
                    features.set(result.data[0][i], typeof result.data[1][i] === "number");
                }
                this.store.features = features;
            };
            reader.onerror = () => {
                console.log("Error reading file...");
            };
        }
    }

    parseWithDelimiter(file, del) {
        let reader = new FileReader();
        if (file && file.size > 0) {
            reader.readAsText(file, "UTF-8");
            reader.onload = () => {
                let result = Papa.parse(reader.result, {
                    delimiter: del,
                    dynamicTyping: true,
                    error(error) {
                        throw new Error(error);
                    }
                })
                this.store.originalData = result.data;
                let features = new Map();
                for (let i = 0; i < result.data[0].length; ++i) {
                    features.set(result.data[0][i], typeof result.data[1][i] === "number");
                }
                this.store.features = features;
            };
            reader.onerror = () => {
                console.log("Error reading file...");
            };
        }
    }
}

export const MainControllerContext = createContext(MainController);
export const useMainController = () => useContext(MainControllerContext);