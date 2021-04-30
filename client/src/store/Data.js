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

    getFeatureIndex(feature) {
        return this.features.indexOf(feature);
    }

    removeFeature(feature) {
        const index = this.getFeatureIndex(feature);
        let res = [];

        for (let col = 0; col < index; ++col) {
            const c = this.getCol(this.features[col]);
            for (let row = 0; row < this.getSize()[0]; ++row) {
                res[row] = [];
                res[row][col] = c[row];
            }
        }

        for (let col = 0; col < this.getSize()[1]; ++col) {
            const c = this.getCol(this.features[col]);
            for (let row = 0; row < this.getSize()[0]; ++row) {
                res[row] = [];
                res[row][col - 1] = c[row];
            }
        }
        this.matrix = res;
    }   
}

