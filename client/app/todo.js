var todoApp = angular.module('todoApp', []);

todoApp.controller('TodoController', function ($scope, TodoService) {
    $scope.todo = {};
    $scope.todoList = [];

    $scope.addTodo = function () {
        TodoService.addTodo($scope.todo)
            .then(function (newTodo) {
                $scope.todoList.push(newTodo);
                $scope.todo = {};
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

todoApp.factory('TodoService', function ($http, $q) {
    return {
        addTodo: function (todo) {
            var defer = $q.defer();

            // resolve with response.data to avoid leaking the http abstraction
            $http.post('/todo', todo)
                .then(function (response) {
                    defer.resolve(response.data);
                }, defer.reject);

            return defer.promise;
        }
    };
});