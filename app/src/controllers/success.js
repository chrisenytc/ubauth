/*
 * Controller: successCtrl
 */

import { clipboard } from 'electron';

export default (app, window, access_token) => {
    return app.controller('successCtrl', ['$scope', function successCtrl($scope) {
        $scope.access_token = access_token;

        $scope.copy = () => {
            clipboard.writeText(access_token);

            new Notification('Success', {
                body: 'Copied to clipboard.'
            });
        };
    }]);
};
