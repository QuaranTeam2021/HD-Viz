const {Model} = require('../../../client/src/model/Model');
const {expect} = require('chai');
const {GraphState} = require('../../../client/src/model/GraphState');
const {Data} = require('../../../client/src/model/Data');

describe('Testing model class', function() {

    context('Testing constructor', function() {

        it('Must construct a Model object', function() {
            const d = new Data([1, 2, 3], ['id', 'name', 'surname']);
            const mod = new Model();
            mod.setOriginalData = d;

            expect(mod).instanceOf(Model);
        })

        it('Should not be undefined', function() {
            const mod = new Model();

            expect(mod).to.not.be.undefined;
        })
    }) 

    context('Testing setOriginalData', function() {

        it('Must set originalData', function() {
            const d = new Data([['id1', 'id2', 'id3'], [1, 2, 3]]);
            const mod = new Model();
            mod.setOriginalData = d;
            const newData = new Data([[8, 9, 3], ['id', 'id2', 'id8']]);
            mod.setOriginalData = newData;

            expect(mod.getOriginalData.getMatrix).to.deep.equal([[8, 9, 3], ['id', 'id2', 'id8']]);
        })

        it('Must set graphs', function() {
            const graph1 = new GraphState('id1', []);
            const graph2 = new GraphState('id2', []);
            const graphs = [graph1, graph2];
            const mod = new Model();
            mod.setGraphs = graphs;

            expect(mod.getGraphs).to.deep.equal([graph1, graph2]);
        })
    }) 

    context('Testing addGraph', function() {

        it('Must add one GraphState in graphs', function() {
            const mod = new Model();
            const graphState = new GraphState('id', []);
            mod.addGraphState(graphState);

            return mod.getGraphs.length === 1;
        })

        it('Must add GraphState in graphs', function() {
            const mod = new Model();
            const graphState = new GraphState('id', []);
            mod.addGraphState(graphState);

            expect(mod.getGraphStateAtIndex(0)).to.deep.equal(graphState);
        })

        it('Must add one GraphState in last position', function() {
            const mod = new Model();
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            mod.addGraphState(graphState);
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);

            expect(mod.getGraphStateAtIndex(2)).to.deep.equal(graphState2);
        })
    }) 

    context('Testing removeGraphStateAtIndex', function() {

        it('Must remove the graphs at the correct index', function() {
            const mod = new Model();
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            mod.addGraphState(graphState);
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);
            mod.removeGraphStateAtIndex(1);

            expect(mod.getGraphStateAtIndex(1)).to.deep.equal(graphState2);
        })
    })

    context('Testing getOriginalData', function() {

        it('Must return originalData', function() {
            const d = [['id', 'name', 'surname'], [1, 2, 3]];
            const mod = new Model();
            mod.setOriginalData = d;
            expect(mod.getOriginalData).to.deep.equal([['id', 'name', 'surname'], [1, 2, 3]]);
        })

        it('Must return a Data object', function() {
            const mod = new Model();
            const res = mod.getOriginalData;
            return typeof res === Data;
        })
    }) 

    context('Testing getSelectedData', function() {

        it('Must return selected data', function() {
            const d = new Data([['id', 'name', 'surname', 'city'], [1, 'Matteo', 'Sinigaglia', 'Padova']]);
            const mod = new Model();
            mod.setOriginalData = d;
            mod.setSelectedFeatures = ['id', 'surname'];

            expect(mod.getSelectedData).to.deep.equal([['id', 'surname'], [1, 'Sinigaglia']]);
        })

        it('Must return a Data object', function() {
            const mod = new Model();
            const res = mod.getOriginalData;
            return typeof res === Data;
        })
    })

    context('Testing getGraphStateAtIndex', function() {

        it('Must return the GraphState at index', function() {
            const mod = new Model();
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            mod.addGraphState(graphState);
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);
            const result = mod.getGraphStateAtIndex(1);

            expect(result).to.deep.equal(graphState1);
        })

        it('Must return error', function() {
            expect(function() {
                const mod = new Model();
                const graphState = new GraphState('id1');
                const graphState1 = new GraphState('id2');
                const graphState2 = new GraphState('id3');
                mod.addGraphState(graphState);
                mod.addGraphState(graphState1);
                mod.addGraphState(graphState2);
                mod.getGraphStateAtIndex(4);
            }).to.throw(Error,'Out of bounds...');
        })

        it('Must return error with negative index', function() {
            expect(function() {
                const mod = new Model();
                const graphState = new GraphState('id1');
                const graphState1 = new GraphState('id2');
                const graphState2 = new GraphState('id3');
                mod.addGraphState(graphState);
                mod.addGraphState(graphState1);
                mod.addGraphState(graphState2);
                mod.getGraphStateAtIndex(-1);
            }).to.throw(Error,'Out of bounds...');
        })

        it('Must return error with empty array', function() {
            expect(function() {
                const mod = new Model();
                mod.getGraphStateAtIndex(0);
            }).to.throw(Error,'Out of bounds...');
        })
    })

    context('Testing reset method', function() {

        it('Must remove originalData', function() {
            const graphState = new GraphState('id1');
            const mod = new Model();
            mod.addGraphState(graphState);
            mod.reset();

            expect(mod.getOriginalData).to.deep.equal([]);
        })

        it('Must remove all GraphState from graphs', function() {
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            const mod = new Model();
            mod.addGraphState(graphState);
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);
            mod.reset();

            return mod.getGraphs.length == 0;
        })

        it('Must remove GraphState from graphs', function() {
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            const mod = new Model();
            mod.addGraphState(graphState);
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);
            mod.reset();

            expect(mod.getGraphs).to.deep.equal([]);
        })
    })

    context('Testing getGraphs method', function() {

        it('Must return graphs array', function() {
            const graphState = new GraphState('id1');
            const graphState1 = new GraphState('id2');
            const graphState2 = new GraphState('id3');
            const mod = new Model();
            mod.addGraphState(graphState);
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);

            expect(mod.getGraphs).to.deep.equal([graphState, graphState1, graphState2]);
        })

        it('Must return empty array', function() {
            const mod = new Model();

            expect(mod.getGraphs).to.deep.equal([]);
        })
    })

    context('Testing setSelectedData', function() {

        it('Must set the selected data', function() {
            const data = new Data([['matricola', 'nome', 'cognome', 'voto'], [1193412, 'Matteo', 'Sinigaglia', '27'], [1193413, 'Alessio', 'Rossi', '30']]);
            const features = ['nome', 'voto'];
            const mod = new Model();
            mod.setOriginalData = data;
            mod.setSelectedFeatures = features;
            mod.setSelectedData();

            expect(mod.getSelectedData).to.deep.equal([['nome', 'voto'], ['Matteo', '27'], ['Alessio', '30']]);
        })
    })

    context('Testing getGraphStateIndexById', function() {

        it('Must return index 1', function() {
            const grSt1 = new GraphState('gr1');
            const grSt2 = new GraphState('gr2');
            const grSt3 = new GraphState('gr3');
            const mod = new Model();
            mod.addGraphState(grSt1);
            mod.addGraphState(grSt2);
            mod.addGraphState(grSt3);
            const actual = mod.getGraphStateIndexById('gr2');

            expect(actual).to.deep.equal(1);
        })

        it('Must return index 2', function() {
            const grSt1 = new GraphState('gr1');
            const grSt2 = new GraphState('gr2');
            const grSt3 = new GraphState('gr3');
            const mod = new Model();
            mod.addGraphState(grSt1);
            mod.addGraphState(grSt2);
            mod.addGraphState(grSt3);
            const actual = mod.getGraphStateIndexById('gr3');

            expect(actual).to.deep.equal(2);
        })

        it('Must throw error', function() {
            expect( function() {
                const grSt1 = new GraphState('gr1');
                const grSt2 = new GraphState('gr2');
                const mod = new Model();
                mod.addGraphState(grSt1);
                mod.addGraphState(grSt2);
                mod.getGraphStateIndexById('gr3');
            }).to.throw(Error, 'Id grafico non presente');
        })
    })

    context('Testing calculateReduction', function() {

        it('Should not be undefined', function() {
            const mod = new Model();
            const graphState1 = new GraphState('gr1');
            const graphState2 = new GraphState('gr2');
            const graphState3 = new GraphState('gr3');
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);
            mod.addGraphState(graphState3);
            const d = new Data([
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ]);
            mod.setOriginalData = d;
            let param = { dims: 2 };
            mod.calculateReduction('pca', param, 'gr2');
            const grRes = mod.getGraphStateAtIndex(1);
            const res = grRes.getDataset;

            expect(res).to.not.be.undefined;
        })

        it('Must set an array', function() {
            const mod = new Model();
            const graphState1 = new GraphState('gr1');
            const graphState2 = new GraphState('gr2');
            const graphState3 = new GraphState('gr3');
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);
            mod.addGraphState(graphState3);
            const d = new Data([
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ]);
            mod.setOriginalData = d;
            let param = { dims: 2 };
            mod.calculateReduction('pca', param, 'gr2');
            const grRes = mod.getGraphStateAtIndex(1);
            const res = grRes.getDataset;

            expect(res).instanceOf(Array);
        })

        it('Must set the correct reduction array', function() {
            const mod = new Model();
            const graphState1 = new GraphState('gr1');
            const graphState2 = new GraphState('gr2');
            const graphState3 = new GraphState('gr3');
            mod.addGraphState(graphState1);
            mod.addGraphState(graphState2);
            mod.addGraphState(graphState3);
            const d = new Data([
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ]);
            const expected = [
                [ -3.458666762269165, 0.027612959089264852 ],
                [ -3.307398289104195, 0.17005252869688292 ],
                [ -3.7334681054722885, -0.10589799733019935 ],
                [ -3.863544525694135, -0.05286586695953013 ],
                [ -3.3513355087302834, -0.12216594029636542 ],
                [ -3.652145505056011, 0.09613527534964193 ]
              ];
            mod.setOriginalData = d;
            let param = { dims: 2 };
            mod.calculateReduction('pca', param, 'gr2');
            const grRes = mod.getGraphStateAtIndex(1);
            const res = grRes.getDataset;

            expect(res).to.deep.equal(expected);
        })
    })
})