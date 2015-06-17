
// Define our dependencies - located in app.js. 
define(['jquery', 'angular'], function ($, angular) {

    // Angular bootstrapping.
    var app = angular.module('ItemsApp', []);
    app.controller('ItemsController', function ($scope) {

        var baseitems = [

            // Blood,Bone,Claw,Fang,Scale,Totem,Venom,Dust

            // T6
            24295,
            24358,
            24351,
            24357,
            24289,
            24300,
            24283,
            24277,

            // T5
            24294,
            24341,
            24350,
            24356,
            24288,
            24299,
            24282,
            24276
        ];

        var recipies = [
            {
                name: "Powerful Blood Promotion",
                ingredients: [
                    {
                        item: 24294,
                        quantity: 50
                    },
                    {
                        item: 24295,
                        quantity: 1
                    },
                    {
                        item: 24277,
                        quantity: 5
                    }
                ],
                result: {
                    item: 24295,
                    quantity: 7
                }
            },
            {
                name: "Large Bone Promotion",
                ingredients: [
                    {
                        item: 24341,
                        quantity: 50
                    },
                    {
                        item: 24358,
                        quantity: 1
                    },
                    {
                        item: 24277,
                        quantity: 5
                    }
                ],
                result: {
                    item: 24358,
                    quantity: 7
                }
            },
            {
                name: "Large Claw Promotion",
                ingredients: [
                    {
                        item: 24350,
                        quantity: 50
                    },
                    {
                        item: 24351,
                        quantity: 1
                    },
                    {
                        item: 24277,
                        quantity: 5
                    }
                ],
                result: {
                    item: 24351,
                    quantity: 7
                }
            },
            {
                name: "Vicious Fang Promotion",
                ingredients: [
                    {
                        item: 24356,
                        quantity: 50
                    },
                    {
                        item: 24357,
                        quantity: 1
                    },
                    {
                        item: 24277,
                        quantity: 5
                    }
                ],
                result: {
                    item: 24357,
                    quantity: 7
                }
            },
            {
                name: "Armored Scale Promotion",
                ingredients: [
                    {
                        item: 24288,
                        quantity: 50
                    },
                    {
                        item: 24289,
                        quantity: 1
                    },
                    {
                        item: 24277,
                        quantity: 5
                    }
                ],
                result: {
                    item: 24289,
                    quantity: 7
                }
            },
            {
                name: "Elaborate Totem Promotion",
                ingredients: [
                    {
                        item: 24299,
                        quantity: 50
                    },
                    {
                        item: 24300,
                        quantity: 1
                    },
                    {
                        item: 24277,
                        quantity: 5
                    }
                ],
                result: {
                    item: 24300,
                    quantity: 7
                }
            },
            {
                name: "Powerful Venom Sac Promotion",
                ingredients: [
                    {
                        item: 24282,
                        quantity: 50
                    },
                    {
                        item: 24283,
                        quantity: 1
                    },
                    {
                        item: 24277,
                        quantity: 5
                    }
                ],
                result: {
                    item: 24283,
                    quantity: 7
                }
            },
        ];

        $scope.recipies = recipies;

        // Callback for a fully loaded recipe.
        var recipeLoaded = function (recipe) {

            // Recalculate totals for each.
            var totalbuyinstant = 0;
            var totalsellingresult = 0;
            var totaldelta = 0;
            $.each(recipe.ingredients, function (id, ingredient) {
                totalbuyinstant += ingredient.quantity * ingredient.item.commerce.sells.unit_price;
            });
            totalsellingresult = recipe.result.quantity * recipe.result.item.commerce.buys.unit_price;
            totaldelta = totalsellingresult - totalbuyinstant;

            recipe.totalBuyInstantPrice = totalbuyinstant;
            recipe.totalSellingResult = totalsellingresult;
            recipe.totalSellingProfit = totaldelta;

            // Force update the UI.
            $scope.$apply(function () { $scope.recipies = $scope.recipies; });
        }

        var isRecipeLoaded = function (recipe) {
            var isloaded = true;
            $.each(recipe.ingredients, function (ind, ing) {
                if (typeof ing.item !== 'object')
                    isloaded = false;
            });
            return isloaded;
        }

        // Callback for filling in the recipe with the data.
        var fillRecipe = function (item) {

            $.each(recipies, function (i, rep) {
                $.each(rep.ingredients, function (id, ingredient) {
                    if (ingredient.item === item.id)
                        ingredient.item = item;
                });
                if (rep.result.item === item.id)
                    rep.result.item = item;

                // Maybe we're fully loaded.
                if (isRecipeLoaded(rep))
                    recipeLoaded(rep);
            });
        };


        // Callback for loading in the prices for the items.
        var commerceurl = 'https://api.guildwars2.com/v2/commerce/prices/';
        var loadCommerce = function (item) {
            $.getJSON(commerceurl + item.id, function (result) {
                item.commerce = result;
                fillRecipe(item);
            });
        };

        // Load up the base items.
        var itemurl = 'https://api.guildwars2.com/v2/items/';
        $.each(baseitems, function (index, id) {
            $.getJSON(itemurl + id, function (result) {
                baseitems[index] = result;
                loadCommerce(result);
            });
        });


    });

});


