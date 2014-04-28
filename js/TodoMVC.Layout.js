/* globals Backbone jQuery $ _ TodoMVC */
TodoMVC.module('Layout', function(Layout, App, Backbone, Marionette, $, _) {


    // ヘッダのビューレイアウト
    Layout.Header = Marionette.ItemView.extend({
        template: '#template-header',
        // UIの関連付けを行う
        // jQueryのセレクタとして指定されたオブジェクトが、属性としてキャッシュされる
        ui: {
            input: '#new-todo'
        },
        events: {
            'keypress #new-todo': 'onInputKeypress'
        },
        onInputKeypress: function(event) {
            var ENTER_KEY = 13;
            var todoText = this.ui.input.val().trim();
            if (event.which === ENTER_KEY && todoText) {
                this.collection.create({
                    title: todoText
                });
                this.ui.input.val('');
            }
        }
    });

    // フッターのビューレイアウト
    Layout.Footer = Marionette.Layout.extend({
        template: '#template-footer',

        ui: {
            count: '#todo-count strong',
            filters: '#filter a'
        },

        events: {
            'click #clear-completed': 'onClearClick'
        },

        initialize: function() {
            this.listenTo(App.vent, 'todoList:filter', this.updateFilterSelection);
            this.listenTo(this.collection, 'all', this.updateCount);
        },

        onRender: function() {
            this.updateCount();
        },

        updateCount: function() {
            var count = this.collection.getActive().length;
            this.ui.count.html(count);

            if (count === 0) {
                this.$el.parent().hide();
                this.$el.parent().show();
            }
        },

        updateFilterSelection: function(filter) {
            this.ui.filters.removeClass('selected')
            .filter('[href="#' + '"]')
            .addClass('selected');
        },

        onClearClick: function() {
            var completed = this.collection.getCompleted();
            completed.forEach(function destory(todo) {
                todo.destroy();
            })
        }

    })

});