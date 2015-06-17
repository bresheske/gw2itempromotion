
// Define our dependencies - located in app.js. 
define(['jquery', 'angular', 'itemsrepository'], function ($, angular, itemsservice) {

    // Angular bootstrapping.
    var app = angular.module('ItemsApp', []);
    app.controller('ItemsController', function ($scope) {

        $scope.Loaded = false;
        $scope.recipies = [];

        $scope.refresh = function () {
            itemsservice.getItems(function (items) {
                $scope.recipies = items;
                console.dir(items);
                $scope.Loaded = true;
                $scope.$apply();
            });
        };

        $scope.refresh();

    });

});

