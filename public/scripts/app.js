'use strict';

var appRoot = document.getElementById('app');

var getTodos = function getTodos() {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

var addTodo = function addTodo(e) {
  e.preventDefault();
  var title = e.target.elements.title.value;
  var description = e.target.elements.description.value;

  if (title) {
    var todos = getTodos();
    var todo = {
      id: uuid.v4(),
      title: title,
      description: description,
      date: moment().valueOf()
    };
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    e.target.elements.title.value = '';
    e.target.elements.description.value = '';

    render();
  }
};

var renderTodos = function renderTodos() {
  return getTodos().sort(function (a, b) {
    return a.date >= b.date ? -1 : 1;
  }).map(function (todo) {
    return generateDOM(todo);
  });
};

var generateDOM = function generateDOM(todo) {
  return React.createElement(
    'li',
    { className: 'list-group-item d-flex justify-content-between align-items-start', id: todo.id, key: todo.id },
    React.createElement(
      'div',
      { className: 'ms-2 me-auto' },
      React.createElement(
        'div',
        { className: 'fw-bold' },
        todo.title
      ),
      todo.description
    ),
    React.createElement(
      'button',
      { className: 'badge bg-primary rounded-pill', onClick: function onClick(e) {
          return removeTodo(e, todo.id);
        } },
      '\xD7'
    )
  );
};

var removeTodo = function removeTodo(e, id) {
  localStorage.setItem('todos', JSON.stringify(getTodos().filter(function (todo) {
    return todo.id != id;
  })));
  render();
};

var render = function render() {

  var todos = getTodos();

  var template = React.createElement(
    'div',
    { className: 'container' },
    React.createElement(
      'div',
      { 'class': 'row' },
      React.createElement(
        'div',
        { 'class': 'col-md-6 col-sm-8 col-12 offset-md-3 offset-sm-2' },
        React.createElement(
          'h1',
          null,
          'Todo Application'
        ),
        React.createElement(
          'h4',
          null,
          'Todos'
        ),
        todos && React.createElement(
          'ol',
          { className: 'list-group mb-2 list-group-numbered list-group-flush', id: 'todos' },
          renderTodos()
        ),
        React.createElement(
          'form',
          { onSubmit: addTodo },
          React.createElement('input', { type: 'text', name: 'title', className: 'form-control mb-2', placeholder: 'Title' }),
          React.createElement('textarea', { name: 'description', className: 'form-control mb-2', placeholder: 'Description' }),
          React.createElement(
            'button',
            { className: 'btn btn-sm btn-success' },
            'Submit'
          )
        )
      )
    )
  );

  ReactDOM.render(template, appRoot);
};

render();
