/* globals Backbone jQuery $ _ TodoMVC */
TodoMVC.module('TodoList.Views', function(Views, App, Backbone, Marionette, $, _) {

    // Todo項目のビュー
    Views.ItemView = Marionette.ItemView.exnted({
        tagName: 'li',
        template: '#template-todoItemView',
        ui: {
            edit: '.edit'
        },
        events: {
            'click .destroy': 'destroy',
            'dblclick label': 'onEditClick',
            'keypress .edit': 'onEditKeypress',
            'click .toggle': 'toggle'
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render)
        },

        onRender: function() {
            this.$el.removeClass('active completed');
            if (this.model.get('completed')) {
                this.$el.addClass('completed');
            } else {
                this.$el.addClass('active');
            }
        },

        destroy: function() {
            this.model.destroy();
        },

        toggle: function() {
            this.model.toggle().save();
        },

        onEditClick: function() {
            this.$el.addClass('editiong');
            this.ui.edit.focus();
        },

        onEditKeypress: function(event) {
            var ENTER_KEY = 13;
            var todoText = this.ui.edit.val().trim();
            if (event.which === ENTER_KEY && todoText) {
                this.model.set('title', todoText).save();
                this.$el.removeClass('editing');
            }
        }
    });

    // Todoリストのビュー
    Views.ListView = Marionette.CompositeView.extend({
        template: '#template-todoListCopmositeView',
        itemView: Views.ItemView,
        itemViewContainer: '#todo-list',

        ui: {
            toggle: '#toggle-all'
        },

        events: {
            'click #toggle-all': 'onToggleAllClick'
        },

        initialize: function() {
            this.listenTo(this.collection, 'all', this.update);
        },

        onRender: function() {
            this.update();
        },

        update: function() {
            function reduceCopmleted(left, right) {
                return left && right.get('completed');
            }
            var allCompleted = this.collection.reduce(reduceCopmleted, true);
            this.ui.toggle.prop('checked', allCompleted);

            if (this.collection.length === 0) {
                this.$el.parent().hide();
            } else {
                this.$el.parent().show();
            }
        },

        onToggleAllClick: function(event) {
            var isChecked = event.currentTarget.checked;
            this.collection.each(function(todo) {
                todo.save({'completed': isChecked});
            });
        }
    });

    // イベントアグリゲーター
    // TodoListControllerから発生するfilterイベントを処理するためのもの
    App.vent.on('todoList:filter', function(filter) {
        filter = filter || '';
        $('#todoapp').attr('class', 'filter-' + filter);
    });
});