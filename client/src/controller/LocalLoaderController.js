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
                                reject("File is empty");
                            }
                            else {
                                this.store.loadData(result.data);     
                                resolve("File succesfully uploaded");         
                            }  
                        }
                    reader.onerror = () => {
                        console.error(`Error reading file: ${reader.error}`);
                        reject(`Error reading file: ${reader.error}`);
                    };
                    reader.readAsText(file, "utf-8");
                })
            }
        }
    }

}

export const LocalLoaderControllerContext = createContext(LocalLoaderController);
export const useLocalLoaderController = () => useContext(LocalLoaderControllerContext);