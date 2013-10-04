var directiveDemo = angular.module('directiveDemo', []);

directiveDemo.directive('dealerInfo', function () {
    return {
        restrict: 'EA',
        scope: {
            dealer: '='
        },
        link: function (scope, element, attrs) {
            element.on('click', function () {
                element.toggleClass('highlight');
            });
        },
        template: '<strong>{{ dealer.name }}</strong>' +
            '<address>' +
            '{{ dealer.address.addressLine1 }} <br/>' +
            '{{ dealer.address.city }}, <br/>' +
            '{{ dealer.address.stateCode }} {{ dealer.address.zipCode }}' +
            '</address>'
    };
});

directiveDemo.controller('DemoController', function ($scope) {
    $scope.theDealer = {
        name: 'A DEALER NAME',
        address: {
            addressLine1: '123 STREET NAME',
            city: 'CITY',
            stateCode: 'STATE',
            zipCode: '12345'
        }
    };
});