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
        var todoToAdd = {description: 'test', project: 'other'};
        var todoFromService = angular.extend({id: 1}, todoToAdd);
        scope.todo = todoToAdd;
        mockTodoService.addTodo.andReturn(q.when(todoFromService));

        scope.addTodo();

        rootScope.$apply();
        expect(scope.todoList.length).toBe(1);
        expect(scope.todoList[0]).toBe(todoFromService);
    });

    it('should assign a new object to the todo when addTodo() called', function () {
        scope.todo = {description: 'test', project: 'other'};
        mockTodoService.addTodo.andReturn(q.when({description: 'test'}));

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

describe('TodoService', function () {
    var todoService, mockHttpBackend, rootScope;

    beforeEach(module('todoApp'));

    beforeEach(inject(function ($rootScope, $httpBackend, TodoService) {
        rootScope = $rootScope;
        mockHttpBackend = $httpBackend;
        todoService = TodoService;
    }));

    it('should post to the /task url with the todo as data when addTodo(todo) called', function () {
        var todo = {description: 'something to test'};
        mockHttpBackend.expectPOST('/todo', todo).respond({});

        todoService.addTodo(todo);

        mockHttpBackend.flush();
    });

    it('should return a promise and resolve it with the response.data value', function () {
        var todoFromClient = {description: 'something to test'},
            todoFromService = angular.extend({id: 1}, todoFromClient),
            resolvedTodo = null;
        mockHttpBackend.expectPOST('/todo', todoFromClient).respond(todoFromService);

        todoService.addTodo(todoFromClient)
            .then(function (newTodo) {
                resolvedTodo = newTodo;
            });

        mockHttpBackend.flush();
        rootScope.$apply();
        expect(resolvedTodo).toBe(todoFromService);
    });

    afterEach(function () {
        mockHttpBackend.verifyNoOutstandingExpectation();
        mockHttpBackend.verifyNoOutstandingRequest();
    });
});