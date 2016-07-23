import path from 'path';
import env from '../env';
import { use, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

describe('Environment', () => {

    it('environment variables should be on their place', () => {
        return expect(env.name).to.equal('test');
    });

});
