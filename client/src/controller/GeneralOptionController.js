import { createContext, useContext } from "react";

export default class GeneralOptionController {

    constructor(store) {
        this.store = store;
    }

}
export const GeneralOptionControllerContext = createContext(GeneralOptionController);
export const useGeneralOptionController = () => useContext(GeneralOptionControllerContext);