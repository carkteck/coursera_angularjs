(function () {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .controller('ToBuyController', ToBuyController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;


    toBuy.buyedItem = function (index){
      ShoppingListCheckOffService.buyedItem(index);
    };

    toBuy.showList = function () {
      return ShoppingListCheckOffService.getItemsToBuy();
    };

    toBuy.showMessage = function () {
      if (ShoppingListCheckOffService.numBuyItem() == 0){
        return true;
      }else{
        return false;
      };
    };
  };


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBuy = this;

    alreadyBuy.showList = function () {
      return ShoppingListCheckOffService.getItemsBuyed();
    };

    alreadyBuy.showMessage = function () {
      if (ShoppingListCheckOffService.numBuyedItem() == 0){
        return true;
      }else{
        return false;
      };
    };
  };


  function ShoppingListCheckOffService() {
    var service = this;

    var items = [{ name: "cookies", quantity: 10 },
                { name: "chips", quantity: 3 },
                { name: "tomatoes", quantity: 4 },
                { name: "bananas", quantity: 7 },
                { name: "orange", quantity: 8 }];


    var itemsBuyed = [];

    service.getItemsToBuy = function() {
      return items;
    };

    service.getItemsBuyed = function() {
      return itemsBuyed;
    };

    service.addItem = function (name, quantity) {
      // add item to itemsBuyed
      var item = {
        "name" : name,
        "quantity": quantity
      };
      itemsBuyed.push(item);
    };

    service.removeItem = function (itemIndex) {
      // Remove index item form items
      items.splice(itemIndex,1);
    };

    service.buyedItem = function (index) {
      // Add to itemsBuyed
      service.addItem(items[index].name, items[index].quantity);
      // Remove from items
      service.removeItem(index);
    };

    // Number of BuyedItem
    service.numBuyedItem = function() {
      return itemsBuyed.length;
    };
    // Number of BuyItem
    service.numBuyItem = function() {
      return items.length;
    };


  };



})();
