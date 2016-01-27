describe('ToDoListController', function () {
    beforeEach(angular.module('ToDoList'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.createItem', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('ToDoListController', { $scope: $scope });
        });

        it('test if item was created', function () {
            $scope.items = [];
            $scope.newItem = { text: "New item" };
            $scope.createItem();
            expect($scope.items.length).toEqual(1);
            expect($scope.items[0].text).toEqual("New item");
        });
    });
});