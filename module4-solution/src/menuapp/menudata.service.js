(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);

// TODO: This service should be declared on the `data` module,
// *not* on the `MenuApp` module.

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;
  var categories = [];

  // List of shopping items
  var menu_items = [];

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {
    var response = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json"),
            }).then(function (response) {
            categories = response.data;
            return categories;
          });
    console.log("categories:", response);
    return response;
  };

  service.getItemsForCategory = function (categoryShortName) {

    var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json?category="+ categoryShortName),
            }).then(function (response) {
            menu_items = response.data;
            return menu_items;
          });
    console.log("dishes:", response);
    return response;
  };

  };


})();
