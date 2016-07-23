/*
 * Controller: authCtrl
 */

export default (app, window) => {
    return app.controller('authCtrl', ['$scope', 'Uber', function authCtrl($scope, Uber) {
        $scope.submit = () => {
            if ($scope.authForm.$valid) {
                var options = $scope.options;
                return Uber.authorize(options);
            } else {
                window.angular.forEach($scope.authForm.$error.required, function(field) {
                    field.$setDirty();
                });
            }
        };
    }]);
};
