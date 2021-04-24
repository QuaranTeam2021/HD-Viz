import Graph from '../Graph';

export default class StandardGraph extends Graph {

    constructor(graphId, type, data) {
        super();
        this.graphId = graphId;
        this.type = type;
        this.data = data;
    }

    set data(data) {
        // if (data.length > 0) {
        let jsonArray = [];
        let colNum = data[0].length;
        for (let i = 0; i < data.length; ++i) {
            let jsonObject = {};
            for (let j = 0; j < colNum; ++j) {
                jsonObject[data[0][j]] = data[i][j];
            }
            jsonArray.push(jsonObject);
        }
            this._data = jsonArray;
        // }
    }

    get data() {
        return this._data;
    }

}