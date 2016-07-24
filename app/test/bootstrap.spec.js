import './test_helper';

let pkg = require('./package.json');

describe("Bootstrap", function() {

    describe('#MainWindow', function() {

        beforeEach(function() {
            return this.app.client.waitUntilWindowLoaded();
        });

        it('should open only 1', function() {
            return this.app.client.getWindowCount()
                .should.eventually.equal(1);
        });

        it('should not be minimized', function() {
            return this.app.client.browserWindow.isMinimized()
                .should.eventually.be.false;
        });

        it('should not open the DevTools window', function() {
            return this.app.client.browserWindow.isDevToolsOpened()
                .should.eventually.be.false;
        });

        it('should be visiable', function() {
            return this.app.client.browserWindow.isVisible()
                .should.eventually.be.true;
        });

        it('should be focused', function() {
            return this.app.client.browserWindow.isFocused()
                .should.eventually.be.true;
        });

        it('should have width equals to \'350px\' and height equals to \'830\'', function() {
            return this.app.client
                .browserWindow.getBounds().should.eventually.have.property('width').and.be.equal(350)
                .browserWindow.getBounds().should.eventually.have.property('height').and.be.equal(830)
        });

        it('should have title equals to \'' + pkg.productName + '\'', function() {
            return this.app.client.browserWindow.getTitle()
                .should.eventually.be.equal(pkg.productName);
        });

    });
});
