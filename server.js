var _ = require('lodash'),
    express = require('express'),
    app = express(),
    todos = {};

app.use(express.static(__dirname + '/client'))
    .use(express.bodyParser());

app.post('/todo', function (req, res) {
    var todo = req.body;
    todo.done = false;
    addTodo(todo);

    res.json(todo);
});

app.get('/todo', function (req, res) {
    res.json(_.toArray(todos));
});

app.listen(3000);

function addTodo(todo) {
    todo.id = _.uniqueId();
    todos[todo.id] = todo;
}

// setup dummy data
addTodo({project: 'MPM', description: 'October PCRs', done: false});
addTodo({project: 'OTHER', description: 'Prepare the L&L presentation', done: true});
addTodo({project: 'OTHER', description: 'Prepare the L&L demo', done: true});
addTodo({project: 'OTHER', description: 'Do the presentation', done: false});