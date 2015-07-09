
// Define our dependencies - located in app.js. 
define(['jquery', 'angular', 'itemsrepository'], function ($, angular, itemsservice) {

    var init = function (app) {
        app.controller('ItemsController', function ($scope) {

            $scope.Loaded = false;
            $scope.recipies = [];

            $scope.refresh = function () {
                $scope.Loaded = false;
                itemsservice.getItems(function (items) {
                    $scope.recipies = items;
                    $scope.Loaded = true;
                    $scope.$apply();
                });
            };

            // Boot up the App.
            $(function () {
                $scope.refresh();
            });

        });
    };


    // Angular bootstrapping.
    var app = angular.module('ItemsApp', []);
    angular.element(document).ready(function ()
    {
        // Now we can finally do stuff!
        init(app);

        // Bootstrap after the controller is created.
        angular.bootstrap(document, ['ItemsApp']);
    });

    
});

