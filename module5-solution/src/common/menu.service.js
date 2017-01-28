(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath','$q'];
function MenuService($http, ApiPath, $q) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function  (short_name){
    // https://YOUR-CHOSEN-SUBDOMAIN.herokuapp.com/menu_items/SHORT-NAME.json
    return $http.get(
        ApiPath + '/menu_items/'+ short_name+'.json').then(function (response){
          return response.data;
        });
  };

  service.isMenuItem = function (short_name){
    var deferred = $q.defer();
    $http.get(
        ApiPath + '/menu_items/'+ short_name+'.json').then(function (){
          console.log('Existe');
          deferred.resolve();
        }, function (){
          console.log('NO Existe');
          deferred.reject();
        });
    return deferred.promise;
  };


}



})();
