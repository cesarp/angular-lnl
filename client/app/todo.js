var todoApp = angular.module('todoApp', []);

todoApp.controller('TodoController', function ($scope) {
    $scope.todo = {};
    $scope.todoList = [];

    $scope.addTodo = function () {
        $scope.todoList.push($scope.todo);

        $scope.todo = {};

        console.log($scope.todoList);
    };
});