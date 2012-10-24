"use strict";

angular.module('order', ['mongoCategories', 'mongoProducts']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/categories', {templateUrl: 'categories_list.html', controller: CategoryListCtrl}).
      when('/categories/new', {templateUrl: 'categories_new.html', controller: CategoryCreateCtrl}).
      when('/categories/edit/:categoryId', {templateUrl: 'categories_new.html', controller: CategoryEditCtrl}).
      when('/products', {templateUrl: 'product.html', controller: ProductListControl}).
      when('/products/new', {templateUrl: 'products_new.html', controller: ProductCreateCtrl}).

      otherwise({redirectTo: '/'});
}]);
