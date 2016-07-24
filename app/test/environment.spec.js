import './test_helper';
import env from '../env';

describe('Environment', function() {

    it('environment variables should be on their place', function() {
        return env.name.should.be.equal('test');
    });

});
