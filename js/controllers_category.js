/* App Controllers */

App.Controllers.CategoryController = function (persistencejs) {
    var self = this;
    self.newCategory = "";
	self.editCategoryStartContent = "";

    self.addTodo = function() {
        if (self.newCategory.length === 0) return;
        
        self.categories.push({
            content: self.newCategory,
            done: false,
            editing: false
        });
		persistencejs.add(self.newCategory);
        self.newCategory = "";
    };

    self.editTodo = function(todo) {
        angular.forEach(self.categories, function(value) {
            value.editing = false;
        });
        todo.editing = true;
		self.editCategoryStartContent = todo.content;
    };

	self.changeStatus = function(todo){
		persistencejs.changeStatus(todo);
	};
	
    self.finishEditing = function(todo) {
        todo.editing = false;
		persistencejs.edit(self.editCategoryStartContent, todo.content);
    };

    self.removeTodo = function(todo) {
        angular.Array.remove(self.categories, todo);
		persistencejs.remove(todo);
    };

    self.categories = [];

    var countCategories = function(done) {
        return function() {
            return angular.Array.count(self.categories, function(x) {
                return x.done === (done === "done");
            });
        }
    };

    self.remainingTodos = countCategories("undone");

    self.finishedTodos = countCategories("done");

    self.clearCompletedItems = function() {
        var oldCategories = self.categories;
        self.categories = [];
        angular.forEach(oldCategories, function(todo) {
            if (!todo.done) self.categories.push(todo);
        });
		persistencejs.clearCompletedItems();
    };

    self.hasFinishedCategories = function() {
        return self.finishedTodos() > 0;
    };

    self.hasCategories = function() {
        return self.categories.length > 0;
    };
	
	self.loadCategories = function(){
		persistencejs.fetchAll(self);
	}
	
	self.refresh = function(){ self.$apply(); }

	self.loadCategories();
	
    /*
     The following code deals with hiding the hint *while* you are typing,
     showing it once you did *finish* typing (aka 500 ms since you hit the last key)
     *in case* the result is a non empty string
     */
    Rx.Observable.FromAngularScope(self, "newCategory")
        .Do(function() {
            self.showHitEnterHint = false;
        })
        
        .Throttle(500)
        .Select(function(x) {
            return x.length > 0;
        })
        .ToOutputProperty(self, "showHitEnterHint");
};

App.Controllers.TodoController.$inject = ['persistencejs'];