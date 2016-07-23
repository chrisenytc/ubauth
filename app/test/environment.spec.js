import { expect } from 'chai';
import env from '../env';

describe("environment tests", function () {

    it("environment variables should be on their place", function () {
        expect(env.name).to.equal('test');
    });

});
