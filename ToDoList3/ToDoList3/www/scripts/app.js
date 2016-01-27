(function () {
    "use strict";

    // To Do list module
    angular.module('ToDoList', []);

    // Main Controller
    angular.module('ToDoList').controller('ToDoListController', function ($scope, FireBaseService) {

        $scope.items = [];

        $scope.selectedItems = [];

        // edit-item-form uses the 'newItem' property to create new list item
        $scope.newItem = {};

        $scope.formVisibility = false;

        // load list items form service
        FireBaseService.loadToDoItems(function (toDoItems) {

            /*(_ = function (__) {
                    return !__ || __ * _(--__)
              })(1 << -~[] + !![]);*/

            //(1 << -~[] + !![]) = 4;

            // operator predence. + before <<
            //!![] = true// []=true // !true = false // !false= true // NOT
            //-~[] = 1; // ~ // bitwise not // -(x + 1)
            //1 + true = 2// true=1
            //1 << 2 = 4;// bitwise left shift
            
            // function expression // function(a,b){ return a + b; }
            // assign function expression to _
            // call immediately function with argument(arg=4) // (function expression)(arguments);
            // !__ || __ * _(--__)
            // recursive calls till __ = 0
            // !4 || 4 * func(3)
            // !3 || 3 * func(2)
            // !2 || 2 * func(1)
            // !1 || 1 * func(0)
            // !0

            // result is 24

            $scope.items = toDoItems;
            $scope.$apply();
        });

        $scope.selectItem = function (item1) {
            $scope.hideForm();
            if ($scope.itemIsSelected(item1) >= 1) {
                $scope.selectedItems = $scope.selectedItems.filter(function (item) {
                    return item.id != item1.id;
                });
            } else {
                $scope.selectedItems.push(item1);
            };
        }

        $scope.itemIsSelected = function (item1) {
            return $scope.selectedItems.filter(function (item) {
                return item.id == item1.id;
            }).length;
        };

        $scope.isSelected = function () {
            return $scope.selectedItems.length;
        };

        $scope.clearSelection = function () {
            return $scope.selectedItems = [];
        };

        // delete selected item
        $scope.closeSelectedItems = function (item) {

            var lengthSelItems = $scope.selectedItems.length;
            for (var i = 0; i < lengthSelItems; i++) {
                FireBaseService.DeleteToDoItem($scope.selectedItems[i]);
            }
            
            $scope.clearSelection();
            $scope.items = FireBaseService.getToDoItems();
        };

        // create new item
        $scope.createItem = function () {
            FireBaseService.CreateToDoItem($scope.newItem);
            $scope.items = FireBaseService.getToDoItems();
            $scope.hideForm();
            $scope.newItem = {};
        };

        // show form for creating item
        $scope.showForm = function () {
            $scope.formVisibility = true;
            cordova.plugins.Keyboard.show();
            window.setTimeout(function () {
                document.getElementById("textItem").focus();
            }, 0);
        };

        $scope.hideForm = function () {
            $scope.formVisibility = false;
            cordova.plugins.Keyboard.close();
        };

        $scope.formIsVisible = function () {
            return $scope.formVisibility;
        };
    });

    /*
        Directives
    */

    // list items directive
    angular.module('ToDoList').directive('listItems', function () {
        return {
            restrict: 'E',
            templateUrl: 'list-items.html'
        };
    });

    // upper menu directive
    angular.module('ToDoList').directive('upperMenu', function () {
        return {
            restrict: 'E',
            templateUrl: 'upper-menu.html'
        };
    });

    // bottom menu directive
    angular.module('ToDoList').directive('bottomMenu', function () {
        return {
            restrict: 'E',
            templateUrl: 'bottom-menu.html'
        };
    });

    // edit form directive
    angular.module('ToDoList').directive('editItemForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'edit-item-form.html'
        };
    });

})();