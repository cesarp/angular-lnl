var todoApp = angular.module('todoApp', []);

todoApp.controller('TodoController', function ($scope) {
    $scope.todo = {};
    $scope.todoList = [];

    $scope.addTodo = function () {
        console.log($scope.todo);
    };
});