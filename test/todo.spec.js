describe('TodoController', function () {
    var controller, scope;

    beforeEach(module('todoApp'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        controller = $controller('TodoController', {
            $scope: scope
        });
    }));

    it('should add the todo to the todoList when addTodo() called', function () {
        var expectedTodo = {description: 'test', project: 'other'};
        scope.todo = expectedTodo;

        scope.addTodo();

        expect(scope.todoList.length).toBe(1);
        expect(scope.todoList[0]).toBe(expectedTodo);
    });

    it('should assign a new object to the todo when addTodo() called', function () {
        scope.todo = {description: 'test', project: 'other'};

        scope.addTodo();

        expect(scope.todo.description).toBeFalsy();
        expect(scope.todo.project).toBeFalsy();
    });
});