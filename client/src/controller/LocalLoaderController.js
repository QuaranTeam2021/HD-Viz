/* eslint-disable prefer-promise-reject-errors */
import { createContext, useContext } from 'react';
import Papa from 'papaparse';

export default class LocalLoaderController {

    constructor(store) {
        this.store = store; 
    }

    // eslint-disable-next-line consistent-return
    parse(file) {
        if (file.size > 0 && file.size < 50000) {
            let reader = new FileReader();
            if (file && file.size > 0) {
                return new Promise((resolve, reject) => {
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
                                reject("Il file caricato è vuoto");
                            }
                            else if (result.data.length > 2000) {
                                reject("Il file caricato è troppo grande, deve contenere massimo 2000 righe");
                            }
                            else {
                                this.store.loadData(result.data);     
                                resolve("Il file è stato caricato correttamente");         
                            }  
                        }
                    reader.onerror = () => {
                        console.error(`Error reading file: ${reader.error}`);
                        reject(`Errore nella lettura del file: ${reader.error}`);
                    };
                    reader.readAsText(file, "utf-8");
                })
            }
        } else {
            if (file.size <= 0) return Promise.reject("File undefined");
            return Promise.reject("Il file caricato è troppo grande, deve contenere massimo 2000 righe");
        }
    }

}

export const LocalLoaderControllerContext = createContext(LocalLoaderController);
export const useLocalLoaderController = () => useContext(LocalLoaderControllerContext);