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

    $scope.theDate = '01/02/2013';
});

directiveDemo.directive('datePicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            var dateFormat = attrs.dateFormat,
                picker;

            picker = new Pikaday({
                field: element[0],
                format: dateFormat,
                onSelect: function () {
                    var date = this.getMoment().format(dateFormat);

                    // if angular is already updating the values we just set the new value
                    if (scope.$$phase || scope.$root.$$phase) {
                        ngModel.$setViewValue(date);
                    } else {
                        // we have to call scope.$apply to let angular know that the value changed
                        scope.$apply(function () {
                            ngModel.$setViewValue(date);
                        });
                    }
                }
            });

            ngModel.$render = function () {
                if (ngModel.$viewValue) {
                    picker.setMoment(moment(ngModel.$viewValue, dateFormat));
                }
            };

            // we have to do some cleanup when the element is going to be destroyed
            element.bind('$destroy', function () {
                picker.destroy();
            });
        }
    };
});