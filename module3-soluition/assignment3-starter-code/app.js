(function () {
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .controller('ShowFoundItemsDirectiveController', ShowFoundItemsDirectiveController)
  .service('MenuSearchService', MenuSearchService)
  .directive('showFoundItems',ShowFoundItemsDirective)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


  function ShowFoundItemsDirective() {
    var ddo = {
      templateUrl: 'shoppingList.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      // // controller: 'ShoppingListDirectiveController as list',
       controller: ShowFoundItemsDirectiveController,
      //  controller: NarrowItDownController,
       controllerAs: 'list',
       bindToController: true
    };
    return ddo;
  }

  ShowFoundItemsDirectiveController.$inject = ['MenuSearchService']
  function ShowFoundItemsDirectiveController(MenuSearchService) {
    var vm = this;

    vm.exist = function(){
      if (!MenuSearchService.hasBeenSearched() || vm.items.length>0 ) {
        return false;
      };
      return true;
    };
    vm.searched = function() {
       return MenuSearchService.hasBeenSearched();
     };
  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var nidc = this;
    // Properties
    nidc.menuItemsShow = [];

    // Methos
    // console.log("menuItemsShow", nidc.menuItemsShow.length);
    nidc.btnNarrowItButtonClick = function() {
        nidc.searchTerm = nidc.searchTerm || "";
        // nidc.menuItemsShow = MenuSearchService.getMatchedMenuItems(nidc.searchTerm);
        var promise = MenuSearchService.getMatchedMenuItems(nidc.searchTerm);
        promise.then(function (response){
            nidc.menuItemsShow = response;
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });

    };

    nidc.removeItem = function (itemIndex) {
      console.log("removeItem", itemIndex);
      MenuSearchService.removeItem(itemIndex);
    };

  };


  MenuSearchService.$inject = ['$q','$http', 'ApiBasePath'];
  function MenuSearchService($q, $http, ApiBasePath) {
    var service = this;
    // Properties
    var items = [];
    var foundsItems = [];
    var searched = false;

    service.getFoundItems= function(){
      return foundsItems;
    };
    service.hasBeenSearched = function(){
      return searched;
    };

    service.removeItem = function (itemIndex) {
      foundsItems.splice(itemIndex, 1);
    };
    // Return all the Menu Items
    service.getMenuItems = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      });
      return response;
    };


    // Return all the menu Items with the searchTerm
    service.getMatchedMenuItems = function(searchTerm) {

      var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
          }).then(function (response) {
            items = response.data.menu_items
            foundsItems = [];
            for (var i = 0; i < items.length; i++) {
              // Check for searchTerm
              // console.log("searchTerm", searchTerm);
              if (searchTerm !== undefined && searchTerm != "" ){
                searched = true;  // Check to show Nothing Found
                if (items[i].description.toLowerCase().indexOf(searchTerm) >= 0) {
                  foundsItems.push(items[i])
                };
              };
            };
            // console.log("foundsItems:", foundsItems);
            return foundsItems;
          });

        return response;
    };

  };



})();
