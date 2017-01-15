(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/menuapp/templates/items.component.template.html',
  bindings: {
    items: '<'
  }
});

})();
