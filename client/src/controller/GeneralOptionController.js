import { createContext, useContext } from "react";

export default class GeneralOptionController {

    constructor(model) {
        this.model = model;
    }

}
export const GeneralOptionControllerContext = createContext(GeneralOptionController);
export const useGeneralOptionController = () => useContext(GeneralOptionControllerContext);