var app = angular.module('example', []);

app.controller('FirstController', function ($scope) {
    $scope.count = 0;

    $scope.doSomething = function () {
        $scope.count++;
    };
});