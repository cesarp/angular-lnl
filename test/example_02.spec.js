describe('Example 02', function () {
    var scope;

    beforeEach(module('example'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        $controller('FirstController', {
            $scope: scope
        });
    }));

    it('should increment the count by 1 when doSomething() called', function () {
        scope.count = 0;

        scope.doSomething();

        expect(scope.count).toBe(1);
    });
});