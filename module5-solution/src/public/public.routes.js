(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.signup',{
      url: '/menu/signup',
      templateUrl:'src/public/sign-up/sign-up.html',
      controller: 'SignUpController',
      controllerAs: 'signUpCtrl'
    })
    .state('public.myinfo',{
      url: '/menu/myinfo',
      templateUrl:'src/public/my-info/myInfo.template.html',
      controller: 'MyInfoController',
      controllerAs: 'ctrl',
      resolve: {
        menuItem: ['MenuService','SignUpService', function(MenuService, SignUpService) {

            var user = SignUpService.getUser();
            var menuItem = undefined;
            if (user.dish == ""){
              return undefined
            }
            return MenuService.getMenuItem(user.dish);
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    });
}
})();
