(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemListController', ItemListController);


ItemListController.$inject = ['MenuDataService', 'items','$stateParams'];
function ItemListController(MenuDataService, items, $stateParams) {
  var ctrl = this;
  console.log("items", items);
  console.log("param", $stateParams.categoryId);

  ctrl.items = items.menu_items;
  ctrl.category = items.category;

  console.log("ctrl.items", ctrl.items);
}

})();
