(function () {
    "use strict";

    // Firebase service
    angular.module('ToDoList').service('FireBaseService', function () {

        var fireBaseRoot = new Firebase("https://flickering-fire-8520.firebaseio.com/ToDoItems");

        var toDoItems = [];

        // load list items from service
        this.loadToDoItems = function (listener) {

            fireBaseRoot.once("value", function (messageSnapshot) {
                messageSnapshot.forEach(function (snapShotItem) {
                    toDoItems.push({id:snapShotItem.key(), text:snapShotItem.val().text});
                });

                listener(toDoItems);
            });
        };
        
        this.getToDoItems = function () {
            return toDoItems;
        };

        this.CreateToDoItem = function (item) {

            // push to service
            var newPostRef = fireBaseRoot.push();
            newPostRef.set(item);

            // add to toDoItems array
            item.id = newPostRef.key();
            toDoItems.push(item);
        };

        this.DeleteToDoItem = function (item1) {

            // delete from service
            fireBaseRoot.child(item1.id).remove();

            // delete from toDoItems array
            toDoItems = toDoItems.filter(function (item) {
                return item.id !== item1.id;
            });
        };
    });
})();