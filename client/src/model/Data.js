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

    //methods
    getBody() {
        return Array.from(this._matrix).splice(1);
    }

    getSize() {
        let rows, cols;
        rows = this._matrix.length;
        cols = this._matrix[0].length;
        return Array.from([rows, cols]);
    }

    getRow(index) {
        return this._matrix[index];
    }

    getCol(feature) {
        const index = this.getFeatureIndex(feature);
        let col = [];
        for (let i = 0; i < this.getSize()[1]; ++i) {
            col[i] = this._matrix[i][index];
        }
        return col;
    }

    getFeatureIndex(feature) {
        let f = this.getFeatures;
        console.log(f)
        return f.indexOf(String(feature));
    }

    removeFeature(feature) {
       const index = this.getFeatureIndex(feature);
       let res = [];
       for (let row = 0; row < this.getSize()[0]; ++row) {
           res[row] = [];
       }

       for (let col = 0; col < index; ++col) {
           const column = this.getCol(this.getFeatures[col]);
           for (let row = 0; row < this.getSize()[0]; ++row) {
               res[row][col] = column[row];
           }
       }

       for (let col = index + 1; col < this.getSize()[1]; ++col) {
            const column = this.getCol(this.getFeatures[col]);
            for (let row = 0; row < this.getSize()[0]; ++row) {
                res[row][col - 1] = column[row];
            }
        }

        this.setMatrix = res;
    }   
}

exports.Data = Data;

