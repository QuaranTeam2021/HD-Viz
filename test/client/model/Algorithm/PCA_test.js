const {expect} = require('chai');
const {PCA} = require('../../../../client/model/Algorithm/PCA');

describe("Testing PCA class", function() {

    context("Testing compute function", function() {
        it("Must return reduced matrix of 2 dimensions", function() {
            const data = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3],
                [5.0,3.4,1.5,0.2]
            ];
            const param = { dims: 2 };
            let actual = new PCA().compute(data, param);
            const expected = [
                [ -3.458666762269165, 0.027612959089264852 ],
                [ -3.307398289104195, 0.17005252869688292 ],
                [ -3.7334681054722885, -0.10589799733019935 ],
                [ -3.863544525694135, -0.05286586695953013 ],
                [ -3.3513355087302834, -0.12216594029636542 ],
                [ -3.652145505056011, 0.09613527534964193 ]
              ];
            expect(actual).to.deep.equal(expected);
        })

        it("Matrix must have same dimensions", function() {
            const input = [
                [4.7,3.2,1.3,0.2],
                [4.6,3.1,1.5,0.2],
                [5.0,3.6,1.4,0.2],
                [5.4,3.9,1.7,0.4],
                [4.6,3.4,1.4,0.3]
            ];
            let param = { dims: 2};
            let res = new PCA().compute(input, param);
            let size = [res.length, res[0].length];
            const expected = [5, 2];

            expect(size).to.deep.equal(expected);
        })
    })
})