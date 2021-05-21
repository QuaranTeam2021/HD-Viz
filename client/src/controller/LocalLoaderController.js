import { createContext, useContext } from 'react';
import Papa from 'papaparse';

export default class LocalLoaderController {

    constructor(store) {
        this.store = store; 
    }

    parse(file) {
        if (file.size > 0 && file.size < 50000) {
            this.store.reset();
            let reader = new FileReader();
            if (file && file.size > 0) {
                reader.readAsText(file, "utf-8");
                reader.onload = () => {
                    let dataString = file.name.split('.')[1] === 'json' ? Papa.unparse(reader.result) : reader.result;
                    let result = Papa.parse(dataString, {
                        dynamicTyping: true,
                        error(error) {
                            throw new Error(error);
                        }
                    })
                    this.store.loadData(result.data);                 
                };
                reader.onerror = () => {
                    console.error("Error reading file...");
                };
            }
        }
    }

}

export const LocalLoaderControllerContext = createContext(LocalLoaderController);
export const useLocalLoaderController = () => useContext(LocalLoaderControllerContext);