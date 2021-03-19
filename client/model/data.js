class Data {

    constructor(matrix = [], features = []) {
        this.matrix = matrix;
        this.features = features;
    }

    // setters
    setMatrix(matrix) {
        this.matrix = matrix;
    }

    setFeatures(features) {
        this.features = features;
    }

    // getters
    getMatrix() {
        return this.matrix;
    }

    getFeatures() {
        return this.features;
    }

    getHeader() {
        return this.matrix[0];
    }

    getBody() {
        return Array.from(this.matrix).splice(1);
    }

    getSize() {
        let rows, cols;
        rows = this.matrix.length;
        cols = this.matrix[0].length;
        return Array.from([rows, cols]);
    }

    getRow(index) {
        return this.matrix[index];
    }

    getCol(feature) {
        const index = this.getFeatureIndex(feature);
        let col = [];
        for (let i = 0; i < this.getSize()[1]; ++i) {
            col[i] = this.matrix[i][index];
        }
        return col;
    }

    getFeatureIndex(feature) {
        return this.features.indexOf(String(feature));
    }

    updateFeatureName(value, feature) {
        const index = this.getFeatureIndex(feature);
        this.matrix[0][index] = String(value);
        this.features = this.matrix[0];
    }

    removeFeature(feature) {
       const index = this.getFeatureIndex(feature);
       let res = [];
       for (let row = 0; row < this.getSize()[0]; ++row) {
           res[row] = [];
       }

       for (let col = 0; col < index; ++col) {
           const column = this.getCol(this.getFeatures()[col]);
           for (let row = 0; row < this.getSize()[0]; ++row) {
               res[row][col] = column[row];
           }
       }

       for (let col = index + 1; col < this.getSize()[1]; ++col) {
            const column = this.getCol(this.getFeatures()[col]);
            for (let row = 0; row < this.getSize()[0]; ++row) {
                res[row][col - 1] = column[row];
            }
        }

        this.setMatrix(res);
        this.setFeatures(this.getHeader());
    }   
}

exports.Data = Data;

