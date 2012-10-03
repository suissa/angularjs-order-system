angular.module('mongoProducts', ['ngResource']).
    factory('Product', function($resource) {
      var Product = $resource('https://api.mongolab.com/api/1/databases/pedidos/collections/products',
          { apiKey: '4ee62127e4b0a1e4b6bb1b38' }, {
            update: { method: 'PUT' }
    });

    return Product;
});

var ProductListControl = function ProductListControl ( $scope, Product ) {
    $scope.products = Product.query();
};

