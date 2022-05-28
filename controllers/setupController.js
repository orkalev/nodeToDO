const { Module } = require('module');
var Todos = require('../models/todoModel');

module.exports = function(app){
    
    app.get('/api/setupTodos', function(req, res) {

        //seed database
        var starterTodos = [
            {
                username: 'test',
                todo: 'Buy milk',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Feed the dog',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Make food',
                isDone: false,
                hasAttachment: false
            }
        ];
        Todos.create(starterTodos, function(err, results){
            res.send(results);
        });
    });
}