require(['jquery'], function ($) {

    // private variables.
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
    var loadedRecipies = [];

    // Constructor for the object.
    function ItemsRepository() {

    }

    // Private methods not exposed externally.

    var clear = function() {
        loadedRecipies = [];
        $.each(recipies, function (ind, r) {
            loadedRecipies.push($.extend(true, {}, r));
        });
    }

    var recipeLoaded = function (recipe, allloadedcallback) {

        // Recalculate totals for each.
        var totalbuyinstant = 0;
        var totalsellingresult = 0;
        var totaldelta = 0;

        $.each(recipe.ingredients, function (id, ingredient) {
            totalbuyinstant += ingredient.quantity * ingredient.item.commerce.sells.unit_price;
        });
        totalsellingresult = recipe.result.quantity * recipe.result.item.commerce.buys.unit_price;
        var totalsellingminusone = (recipe.result.quantity - 1) * recipe.result.item.commerce.buys.unit_price;

        totaldelta = totalsellingresult - totalbuyinstant;
        totaldeltaminusone = totalsellingminusone - totalbuyinstant;

        recipe.totalBuyInstantPrice = totalbuyinstant;
        recipe.totalSellingResult = totalsellingresult;
        recipe.totalSellingProfit = totaldelta;
        recipe.totalSellingProfitMinusOne = totaldeltaminusone;

        // callback as needed.
        if (areAllRecipiesLoaded() && allloadedcallback)
            allloadedcallback(loadedRecipies);
    };

    var isRecipeLoaded = function (recipe) {
        var isloaded = true;
        $.each(recipe.ingredients, function (ind, ing) {
            if (typeof ing.item !== 'object')
                isloaded = false;
        });
        return isloaded;
    };

    var areAllRecipiesLoaded = function () {
        var isloaded = true;
        $.each(loadedRecipies, function (ind, r) {
            isloaded = isloaded && isRecipeLoaded(r);
        });
        return isloaded;
    };

    var fillRecipe = function (item, allloadedcallback) {

        $.each(loadedRecipies, function (i, rep) {
            $.each(rep.ingredients, function (id, ingredient) {
                if (ingredient.item === item.id)
                    ingredient.item = item;
            });
            if (rep.result.item === item.id)
                rep.result.item = item;

            // Maybe we're fully loaded.
            if (isRecipeLoaded(rep))
                recipeLoaded(rep, allloadedcallback);
        });
    };

    var commerceurl = 'https://api.guildwars2.com/v2/commerce/prices/';
    var loadCommerce = function (item, allloadedcallback) {
        $.getJSON(commerceurl + item.id, function (result) {
            item.commerce = result;
            fillRecipe(item, allloadedcallback);
        });
    };

    var itemurl = 'https://api.guildwars2.com/v2/items/';
    var loadRecipies = function (allloadedcallback) {
        // Dump the old results first.
        clear();
        $.each(baseitems, function (index, id) {
            $.getJSON(itemurl + id, function (result) {
                loadCommerce(result, allloadedcallback);
            });
        });
    }



    // Defines methods that are publicly-visable.
    ItemsRepository.prototype = {
        constructor: ItemsRepository,

        // Function calls the API and populates all required data.
        getItems: function (callback) {
            loadRecipies(callback);
        }

    }

    // Could return a reference to the items constructor, or a new instance of the object.
    // Depends on what makes sense for the object.  Here, it makes sense to create a new instance.
    return new ItemsRepository();
});
