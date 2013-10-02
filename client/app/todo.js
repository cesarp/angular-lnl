var todoApp = angular.module('todoApp', []);

todoApp.controller('TodoController', function ($scope) {
    $scope.todo = {};
    $scope.todoList = [];

    $scope.addTodo = function () {
        $scope.todoList.push($scope.todo);

        $scope.todo = {};
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