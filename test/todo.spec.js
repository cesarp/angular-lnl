describe('TodoController', function () {
    var controller, scope, rootScope, q;

    // to use instead of the one that goes to the backend
    function TodoMock() {
        this.$save = jasmine.createSpy();
        this.$save.andReturn(q.when(this));
    }

    // load our module
    beforeEach(module('todoApp'));

    // prepare the object under test
    beforeEach(inject(function ($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        q = $q;
        rootScope = $rootScope;

        TodoMock.query = jasmine.createSpy();
        scope.addTodoForm = jasmine.createSpyObj('addTodoForm', ['$setPristine']);

        controller = $controller('TodoController', {
            $scope: scope,
            Todo: TodoMock
        });
    }));

    it('should add the todo to the todoList when addTodo() called with success', function () {
        var expectedTodo = scope.todo;
        expectedTodo.description = 'something'; // suppose the user typed this in the UI
        scope.todoList = [];

        scope.addTodo();

        rootScope.$apply(); // to simulate that the async operation completed
        expect(scope.todoList.length).toBe(1);
        expect(scope.todoList[0]).toBe(expectedTodo);
    });

    it('should assign a new instance to the $scope.todo when addTodo() called', function () {
        var originalTodo = scope.todo;
        scope.todo.description = 'my test';
        scope.todo.project = 'my project';
        scope.todoList = [];

        scope.addTodo();

        rootScope.$apply();
        expect(scope.todo).not.toBe(originalTodo);
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

    it('should load the list of todos when the controller is created', function () {
        expect(TodoMock.query).toHaveBeenCalled();
    });
});