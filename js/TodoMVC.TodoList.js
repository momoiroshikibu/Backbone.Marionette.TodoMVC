/* globals Backbone jQuery $ _ TodoMVC */
TodoMVC.module('TodoList', function(TodoList, App, Backbone, Marionette, $, _) {
    // TodoListのルーター
    // 未了または完了済みの項目を表示させるためのルート
    TodoList.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '*filter': 'filterItems'
        }
    });

    // TodoListのコントローラー(メディエーター)
    // ビューやモデルに関する詳細を隠し、アプリケーションレベルでの
    // ワークフローとロジックを制御する
    TodoList.Controller = function() {
        this.todoList = new App.Todos.TodoList();
    };

    _.extend(TodoList.Controller.prototype, {
        // 適切なビューを表示し、Todo項目のリストを取得して
        // アプリケーションを開始する
        start: function() {
            this.showHeader(this.todoList);
            this.showFooter(this.todoList);
            this.showTodoList(this.todoList);
            this.todoList.fetch();
        },

        showHeader: function(todoList) {
            var header = new App.Layout.Header({
                collection: todoList
            });
            App.header.show(header);
        },

        showFooter: function(todoList) {
            var footer = new App.Layout.Footer({
                collection: todoList
            });
            App.footer.show(footer);
        },

        showTodoList: function(todoList) {
            App.main.show(new TodoList.Views.ListView({
                collection: todoList
            }));
        },

        // 指定された状態の項目あるいは全件を表示するためのフィルタをセット
        filterItems: function(filter) {
            App.vent.trigger('todoList:filger', filter.trim() || '');
        }


    });

    // TodoListの初期化コード

    // アプリケーションの開始時に、TodoListの初期化処理を行う
    // メディエーターを初期化するとともに、既存のTodo項目を取り込んで表示する
    TodoList.addInitializer(function() {
        var controller = new TodoList.Controller();
        new TodoList.Router({
            controller: controller
        });
        controller.start();
    });

});