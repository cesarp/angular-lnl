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

    /*
     'get':    {method:'GET'},      /path/params?moreParams expects one object back
     'save':   {method:'POST'},     /path/ or /path/id for save/update
     'query':  {method:'GET'},      /path    to get a list back
     'remove': {method:'DELETE'},   /path/id to remove it
     'delete': {method:'DELETE'}    /path/id the same as remove

     MyResource.query({done:false}) becomes GET /path?done=false

     You can also create new instances
     var instance = new MyResource();

     now you get some instance methods too
     instance.$save();
     instance.$remove();
     instance.$delete();
     */
});