(function(){

"use strict";
angular.module('public')
.controller('MyInfoController', MyInfoController);



MyInfoController.$inject = ['SignUpService','menuItem','ApiPath']
function MyInfoController(SignUpService, menuItem,ApiPath) {
  var ctrl = this;
  ctrl.basePath = ApiPath;
  ctrl.user = SignUpService.getUser();
  ctrl.menuItem = menuItem;
  var $ctrl = this;
  ctrl.menuItem = menuItem;
  console.log(menuItem);
  ctrl.show = true;
  if (menuItem === undefined){
      ctrl.show = false;
  };

};


})();
