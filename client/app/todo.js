var todoApp = angular.module('todoApp', ['ngResource']);

todoApp.controller('TodoController', function ($scope, Todo) {
    $scope.todo = new Todo();
    $scope.todoList = Todo.query();

    $scope.addTodo = function () {
        $scope.todo.$save()
            .then(function (todo) {
                $scope.todoList.push($scope.todo);

                $scope.todo = new Todo();

                $scope.addTodoForm.$setPristine();
            });
    };

    $scope.deleteCompleted = function () {
        var oldTodoList = $scope.todoList;

        $scope.todoList = [];

        oldTodoList.forEach(function (oldTodo) {
            if (!oldTodo.done) {
                $scope.todoList.push(oldTodo);
            }
        });
    };
});

// define a resource instead of using the $http module
todoApp.factory('Todo', function ($resource) {
    return $resource('/todo/:id');
});