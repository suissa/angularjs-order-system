"use strict";

angular.module('order', ['mongoCategories', 'mongoProducts']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/categories', {templateUrl: '/angularjs-order-system/app/categories_list.html', controller: CategoryListCtrl}).
      when('/categories/new', {templateUrl: '/angularjs-order-system/app/categories_new.html', controller: CategoryCreateCtrl}).
      when('/categories/edit/:categoryId', {templateUrl: '/angularjs-order-system/app/categories_new.html', controller: CategoryEditCtrl}).
      when('/products', {templateUrl: '/angularjs-order-system/app/product.html', controller: ProductListControl}).
      //when('/products/new', {templateUrl: '/angularjs-order-system/app/product_new.html', controller: ProductCreateControl}).
      otherwise({redirectTo: '/'});
}]);
