var todoApp = angular.module('todoApp', []);

todoApp.controller('TodoController', function ($scope, TodoService) {
    $scope.todo = {};
    $scope.todoList = [];

    $scope.addTodo = function () {
        TodoService.addTodo($scope.todo)
            .then(function (response) {
                // response.data contains what the server returns
                console.log(response);

                $scope.todoList.push(response.data);
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

todoApp.factory('TodoService', function ($http) {
    return {
        addTodo: function (todo) {
            // returns a promise
            return $http.post('/todo', todo);
        }
    };
});