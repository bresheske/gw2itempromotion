

// Configs could be in a COMMON js file.
require.config({
    baseUrl: 'Scripts',
    paths: {

        // Dependencies
        'angular': 'libs/angular',
        'jquery': 'libs/jquery-2.1.4.min',
        'bootstrap': 'libs/bootstrap.min',

        // Controllers
        'items': 'controllers/itemscontroller',

        // Services
        'itemsrepository': 'services/ItemsRepository',
    },
    shim: {
        // Angular is not AMD aware. :(
        'angular': {
            exports: 'angular'
        }
    }
});