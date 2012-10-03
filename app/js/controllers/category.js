angular.module('mongoCategories', ['ngResource']).
    factory('Category', function($resource) {
      var Category = $resource('https://api.mongolab.com/api/1/databases/pedidos/collections/categories/:id',
          { apiKey: '4ee62127e4b0a1e4b6bb1b38' }, {
            update: { method: 'PUT' }
    });

    Category.prototype.update = function(cb) {
        return Category.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
    };
 
	Category.prototype.destroy = function(cb) {
	  return Category.remove({id: this._id.$oid}, cb);
	};

	return Category;
});


function CategoryListCtrl($scope, Category){
	$scope.categories = Category.query();
};

function CategoryCreateCtrl($scope, $location, Category) {
  $scope.save = function() {
    Category.save($scope.category, function(category) {
      $location.path('/categories/');
    });
  }
}

function CategoryEditCtrl($scope, $location, $routeParams, Category) {
  var self = this;

  Category.get({id: $routeParams.categoryId}, function(category) {
    self.original = category;
    $scope.category = new Category(self.original);

  });
 
  $scope.isClean = function() {
    return angular.equals(self.original, $scope.category);
  }
 
  $scope.destroy = function() {
    self.original.destroy(function() {
      $location.path('/categories');
    });
  };
 
  $scope.save = function() {
    $scope.category.update(function() {
      $location.path('/categories');
    });
  };
}