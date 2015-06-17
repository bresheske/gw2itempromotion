// This kick-starts an application.  In our case, the items app.
require(['jquery', 'angular'], function ($, angular) {
    var app = angular.module('ItemsApp', []);
    require(['bootstrap'], function () {
        require(['items']);
    });
});
