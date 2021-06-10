/* eslint-disable prefer-promise-reject-errors */
import { createContext, useContext } from 'react';
import Papa from 'papaparse';

export default class LocalLoaderController {

    constructor(store) {
        this.store = store; 
    }

    // eslint-disable-next-line consistent-return
    parse(file) {
        if (file.size > 50000) return Promise.reject("Il file caricato è troppo grande");
        let reader = new FileReader();
        if (file && file.size > 0) {
                reader.onload = () => {
                    let dataString = file.name.split('.')[1] === 'json' ? Papa.unparse(reader.result) : reader.result;
                    let result = Papa.parse(dataString, {
                        dynamicTyping: true,
                        error(error) {
                            throw new Error(error);
                        },
                        skipEmptyLines: true
                    })
                    if (result.data.length === 0) {
                        Promise.reject("Il file caricato è vuoto");
                    }
                    else if (result.data.length > 2000) {
                        Promise.reject("Il file caricato è troppo grande");
                    }
                    else {
                        this.store.loadData(result.data);     
                        Promise.resolve("Il file è stato caricato correttamente");         
                    }  
                }
            reader.onerror = () => {
                console.error(`Error reading file: ${reader.error}`);
                Promise.reject(`Errore nella lettura del file: ${reader.error}`);
            };
            reader.readAsText(file, "utf-8");
        }
    }
}

export const LocalLoaderControllerContext = createContext(LocalLoaderController);
export const useLocalLoaderController = () => useContext(LocalLoaderControllerContext);