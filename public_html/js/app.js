// js/todoList.js
'use strict';

var app = angular.module('MonApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
            .when('/', {templateUrl:'partials/home.html'})
            .when('/todoList', {templateUrl:'partials/todoList.html', controller:'todoCtrl'})
            .otherwise({redirectTo:'/'})
})

app.controller('todoCtrl', ['$scope',
    function($scope) {

        // Pour manipuler plus simplement les todos au sein du contrôleur
        // On initialise les todos avec un tableau vide : []
        var todos = $scope.todos = [];

        // Ajouter un todo
        $scope.addTodo = function() {
            // .trim() permet de supprimer les espaces inutiles
            // en début et fin d'une chaîne de caractères
            var title = $scope.title.trim();
            var content = $scope.content.trim();
            if (!title.length && !content.length) {
                // éviter les todos vides
                return;
            }
            todos.push({
                // on ajoute le todo au tableau des todos
                title: title,
                content: content,
                date: new Date(),
                completed: false
            });
            // Réinitialisation de la variable newTodo
            $scope.title = '';
            $scope.content = '';
        };

        // Enlever un todo
        $scope.removeTodo = function(todo) {
            todos.splice(todos.indexOf(todo), 1);
        };

        // Cocher / Décocher tous les todos
        $scope.markAll = function(completed) {
            todos.forEach(function(todo) {
                todo.completed = completed;
            });
        };

        // Enlever tous les todos cochés
        $scope.clearCompletedTodos = function() {
            $scope.todos = todos = todos.filter(function(todo) {
                return !todo.completed;
            });
        };
    }
]);
