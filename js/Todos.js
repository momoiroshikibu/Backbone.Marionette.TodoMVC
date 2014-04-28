/* globals Backbone jQuery $ _ TodoMVC */
TodoMVC.module('Todos', function(Todos, App, Backbone, Marionette, $, _) {

    // Todoモデル
    Todos.Todo = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('todos-backbone'),

        defaults: {
            title: '',
            completed: false,
            created: 0
        },

        initialize: function() {
            if (this.isNew()) {
                this.set('created', Date.now());
            }
        },

        toggle: function() {
            return this.set('completed', !this.isCompleted());
        },

        isCopmleted: function() {
            return this.get('completed');
        }
    });

    Todos.TodoList = Backbone.Collection.extend({
        model: Todos.Todo,
        localStorage: new Backbone.LocalStorage('todos-backbone'),

        getCompleted: function() {
            return this.filter(this._isCompleted);
        },

        getActive: function() {
            return this.reject(this._isCompleted);
        },

        comparator: function() {
            return this.get('created');
        },

        _isCompleted: function(todo) {
            return todo.isCompleted();
        }
    });

});