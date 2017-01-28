(function (){
"use strict";

angular.module('public')
// .controller('SignUpController', SignUpController, ['SignUpService']);
.controller('SignUpController', SignUpController)
.directive('isItem', IsItemDirective);


SignUpController.$inject = ['SignUpService', 'MenuService','$state'];
function SignUpController(SignUpService, MenuService, $state) {
  var ctrl = this;
  ctrl.user ={};
  ctrl.saved=false;

  ctrl.submit = function () {
    console.log("paso submit",ctrl.user);

    var promise = MenuService.getMenuItem(ctrl.user.dish);
    promise.then(function(response){
      ctrl.item = response;
    })
    .catch(function(error){
      console.log('ERROR',error);
    });
    SignUpService.setUser (ctrl.user);
    ctrl.saved = true;
    //$state.go('public.myinfo');
  };
};



IsItemDirective.$inject = ['MenuService','$http', '$q'];
function IsItemDirective(MenuService, $http, $q){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.isItem = function(modelValue, viewValue) {
            var value = modelValue || viewValue

            return MenuService.isMenuItem(value);
        }
    }
  };
};


})();
