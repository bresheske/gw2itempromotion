
requirejs.config({
    baseUrl: 'Scripts',
    paths: {

        // Dependencies
        'angular': 'libs/angular.min',
        'jquery': 'libs/jquery-2.1.4.min',
        'bootstrap': 'libs/bootstrap.min',

        // Controllers
        'items': 'controllers/itemsscontroller',

        // Services
    },
    shim: {
        // Angular is not AMD aware. :(
        'angular': {
            exports: 'angular'
        }
    }
});

// Starts up the single-page module.
requirejs(['controllers/itemscontroller']);