export default class Data {

    constructor(matrix = []) {
        this._matrix = matrix;
    }

    set matrix(matrix) {
        this._matrix = matrix;
    }

    get matrix() {
        return this._matrix;
    }

    get features() {
        return this._matrix.length === 1 ? this._matrix.flat() : this._matrix[0];
    }

    getSize() {
        return [this._matrix.length, this._matrix[0].length];
    }

    getCol(feature) {
        let index = this.matrix[0].indexOf(feature);
        let col = [];
        for (let i = 0; i < this.matrix.length; ++i) {
            col.push(this.matrix[i][index]);
        }
        return col;
    }
}

