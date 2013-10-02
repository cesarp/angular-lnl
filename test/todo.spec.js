describe('TodoController', function () {
    var controller, scope, rootScope, q, mockTodoService;

    beforeEach(module('todoApp'));

    beforeEach(inject(function ($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        q = $q;
        rootScope = $rootScope;
        mockTodoService = jasmine.createSpyObj('TodoService', ['addTodo']);

        controller = $controller('TodoController', {
            $scope: scope,
            TodoService: mockTodoService
        });
    }));

    it('should add the todo to the todoList when addTodo() called with success', function () {
        var expectedTodo = {description: 'test', project: 'other'};
        var response = {data: expectedTodo};
        scope.todo = expectedTodo;
        mockTodoService.addTodo.andReturn(q.when(response));

        scope.addTodo();

        rootScope.$apply();
        expect(scope.todoList.length).toBe(1);
        expect(scope.todoList[0]).toBe(expectedTodo);
    });

    it('should assign a new object to the todo when addTodo() called', function () {
        scope.todo = {description: 'test', project: 'other'};
        mockTodoService.addTodo.andReturn(q.when({data: scope.todo}));

        scope.addTodo();

        rootScope.$apply();
        expect(scope.todo.description).toBeFalsy();
        expect(scope.todo.project).toBeFalsy();
    });

    it('should only have incomplete todos on the todoList when deleteCompleted() called', function () {
        scope.todoList = [
            {done: true},
            {done: false},
            {done: true}
        ];

        scope.deleteCompleted();

        expect(scope.todoList.length).toBe(1);
        expect(scope.todoList[0].done).toBeFalsy();
    });
});