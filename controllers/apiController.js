var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app){
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));

    //The endpoint will get the user name and find at the DB all the todo list for the user
    app.get('/api/todos/:username', function(req, res) {
        console.log(`[/api/todos/:username] - the uname is: ${req.params.username}`);
        Todos.find({ username: req.params.username },
            function(err, todos) {
                if (err) throw err;
                
                res.send(todos);
            });
    });

    //The endpoint will get a todo uniqe id and find the todo at the DB
    app.get('/api/todo/:id', function(req, res){
        console.log(`[/api/todo/:id] - the id is: ${req.params.id}`);
        Todos.findById({ _id: req.params.id },
             function(err, todos) {
                 if (err) throw err;

                 res.send(todos);
             });
    });

    //The end will get a todo to update or to create a new one. 
    //If there is a todo id at the body request then we need to update the todo by id
    //Else we will create a new todo at the data base. 
    app.post('/api/todo', function(req, res){
        if(req.body.id){
            Todos.findByIdAndUpdate(req.body.id, { 
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function(err, todo){
                if (err) throw err;

                res.send(`Success - todo id: ${req.body.id} is updated`);
            });
        }else{
            var newTodo = Todos({
                username: 'test',
                todo: req.bost.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function(err) {
                if (err) throw err;
                res.send('Success - new todo is created');
            });
        }
    });

    //The endpoint will get a id and remvoe the todo from the DB
    app.delete('/api/todo', function(req, res){
        Todos.findByIdAndRemove(req.body.id,
             function(err){
                 if (err) throw err;
                 res.send(`Success - todo id: ${req.body.id} id remove of the DB`)
             });
    });


}
