
// Define our dependencies - located in app.js. 
define(['jquery', 'angular', 'itemsrepository'], function ($, angular, itemsservice) {

    function ItemsController($scope) {

        $scope.recipies = [];
        $scope.isLoaded = false;

        itemsservice.getItems(function (items) {
            $scope.recipies = items;
            $scope.isLoaded = true;
            $scope.$apply();
        });

    };

});
