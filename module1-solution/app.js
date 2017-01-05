(function () {
'use strict';
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  $scope.messagetxt ="";
  $scope.countList = function () {
        // avoid error with undefined
        var list_array=$scope.lunch_list || "";
        var counter = 0;  // Counter of no empty items
        list_array =list_array.split(",");
        list_array.forEach(function (item, index, array){
          if (item.trim() != "") {
              counter += 1;
          }
        });
        if (counter == 0){
            $scope.messagetxt = "Please enter data first";
        }else{
            if (counter <= 3) {
                $scope.messagetxt ="Enjoy!";
            } else {
                $scope.messagetxt ="Too much!";
            }
        }
  };
};

})();
