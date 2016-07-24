import path from 'path';
import electron from 'electron-prebuilt';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Application } from 'spectron';

chai.use(chaiAsPromised);

chai.should();

beforeEach(function () {
    let appPath = path.join(__dirname, '..', 'build');

    this.app = new Application({
        path: electron,
        args: [appPath],
        startTimeout: 8000,
        chromeDriverLogPath: '/tmp/chromedriver.log',
        nodePath: process.env.NODE_PATH
    });

    return this.app.start();
});

beforeEach(function () {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness;
});

afterEach(function () {
    if (this.app && this.app.isRunning()) {
        return this.app.stop();
    }
});
