/*
 * Controller: successCtrl
 */

import path from 'path';
import notifier from 'node-notifier';
import { clipboard } from 'electron';

export default (app, window, access_token) => {
    return app.controller('successCtrl', ['$scope', function successCtrl($scope) {
        $scope.access_token = access_token;

        $scope.copy = () => {
            clipboard.writeText(access_token);

            notifier.notify({
                title: 'Success',
                message: 'Copied to clipboard.',
                icon: path.join(__dirname, '..', '..', 'assets', 'images', 'icon.png')
            });
        };
    }]);
};
