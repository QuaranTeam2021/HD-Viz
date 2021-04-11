const {column} = require('mathjs');

class Data {

    constructor(matrix = []) {
        this._matrix = matrix;
    }

    // setters
    set setMatrix(matrix) {
        this._matrix = matrix;
    }

    // getters
    get getMatrix() {
        return this._matrix;
    }

    get getFeatures() {
        return this._matrix.length === 1 ? this._matrix.flat() : this._matrix[0];
    }

    // methods
    getBody() {
        return Array.from(this._matrix).splice(1);
    }

    getSize() {
        let cols, rows;
        rows = this._matrix.length;
        cols = this._matrix[0].length;
        return Array.from([rows, cols]);
    }

    getRow(index) {
        return this._matrix[index];
    }

    getCol(feature) {
        let index = Array.from(this._matrix[0]).indexOf(feature);
        return column(this._matrix, index).flat();
    }

    getFeatureIndex(feature) {
        let f = this.getFeatures;
        return f.indexOf(String(feature));
    }

    removeFeature(feature) {
        const index = this.getFeatureIndex(feature);
        let res = [];
        for (let row = 0; row < this.getSize()[0]; ++row) {
            res[row] = [];
        }

        for (let col = 0; col < index; ++col) {
            const c = this.getCol(this.getFeatures[col]);
            for (let row = 0; row < this.getSize()[0]; ++row) {
                res[row][col] = c[row];
            }
        }

        for (let col = index + 1; col < this.getSize()[1]; ++col) {
            const c = this.getCol(this.getFeatures[col]);
            for (let row = 0; row < this.getSize()[0]; ++row) {
                res[row][col - 1] = c[row];
            }
        }
        this.setMatrix = res;
    }   
}

exports.Data = Data;

