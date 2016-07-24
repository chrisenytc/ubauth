import './test_helper';
import env from '../env';

describe('Environment', () => {

    it('environment variables should be on their place', () => {
        return env.name.should.be.equal('test');
    });

});
