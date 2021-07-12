'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appRoot = document.getElementById('app');

var TodoApp = function (_React$Component) {
  _inherits(TodoApp, _React$Component);

  function TodoApp(props) {
    _classCallCheck(this, TodoApp);

    var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

    _this.removeTodo = _this.removeTodo.bind(_this);
    _this.loadTodos = _this.loadTodos.bind(_this);
    _this.saveTodos = _this.saveTodos.bind(_this);
    _this.state = {
      todos: []
    };
    return _this;
  }

  _createClass(TodoApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadTodos();
    }
  }, {
    key: 'removeTodo',
    value: function removeTodo(id) {
      this.setState(function (prevState) {
        return {
          todos: prevState.todos.filter(function (todo) {
            return todo.id != id;
          })
        };
      });
      this.saveTodos();
    }
  }, {
    key: 'loadTodos',
    value: function loadTodos() {
      this.setState(function () {
        return {
          todos: JSON.parse(localStorage.getItem('todos')) || []
        };
      });
    }
  }, {
    key: 'saveTodos',
    value: function saveTodos(todo) {
      var todos = this.state.todos;
      if (todo) {
        todos.push(todo);
        this.setState(function () {
          return { todos: todos };
        });
      }

      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'py-2 col-md-6 col-sm-8 col-12 offset-md-3 offset-sm-2' },
            React.createElement(Header, null),
            React.createElement(AddTodo, { saveTodo: this.saveTodos }),
            React.createElement(Todos, { todos: this.state.todos, removeTodo: this.removeTodo })
          )
        )
      );
    }
  }]);

  return TodoApp;
}(React.Component);

var Todos = function (_React$Component2) {
  _inherits(Todos, _React$Component2);

  function Todos(props) {
    _classCallCheck(this, Todos);

    var _this2 = _possibleConstructorReturn(this, (Todos.__proto__ || Object.getPrototypeOf(Todos)).call(this, props));

    _this2.renderTodos = _this2.renderTodos.bind(_this2);
    return _this2;
  }

  _createClass(Todos, [{
    key: 'renderTodos',
    value: function renderTodos() {
      var _this3 = this;

      return this.props.todos.sort(function (a, b) {
        return a.date >= b.date ? -1 : 1;
      }).map(function (todo) {
        return React.createElement(Todo, { key: todo.id, todo: todo, removeTodo: _this3.props.removeTodo });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.props.todos.length > 0 && React.createElement(
          'h4',
          null,
          'Todos'
        ),
        this.props.todos && React.createElement(
          'ol',
          { className: 'mb-2 list-group list-group-numbered list-group-flush', id: 'todos' },
          this.renderTodos()
        )
      );
    }
  }]);

  return Todos;
}(React.Component);

var Todo = function (_React$Component3) {
  _inherits(Todo, _React$Component3);

  function Todo(props) {
    _classCallCheck(this, Todo);

    return _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this, props));
  }

  _createClass(Todo, [{
    key: 'render',
    value: function render() {
      var _this5 = this;

      return React.createElement(
        'li',
        { className: 'list-group-item d-flex justify-content-between align-items-start', id: this.props.todo.id },
        React.createElement(
          'div',
          { className: 'ms-2 me-auto' },
          React.createElement(
            'div',
            { className: 'fw-bold' },
            this.props.todo.title
          ),
          this.props.todo.description
        ),
        React.createElement(
          'button',
          { className: 'badge bg-primary rounded-pill', onClick: function onClick(e) {
              return _this5.props.removeTodo(_this5.props.todo.id);
            } },
          '\xD7'
        )
      );
    }
  }]);

  return Todo;
}(React.Component);

var AddTodo = function (_React$Component4) {
  _inherits(AddTodo, _React$Component4);

  function AddTodo(props) {
    _classCallCheck(this, AddTodo);

    var _this6 = _possibleConstructorReturn(this, (AddTodo.__proto__ || Object.getPrototypeOf(AddTodo)).call(this, props));

    _this6.addTodo = _this6.addTodo.bind(_this6);
    return _this6;
  }

  _createClass(AddTodo, [{
    key: 'addTodo',
    value: function addTodo(e) {
      e.preventDefault();
      var title = e.target.elements.title.value;
      var description = e.target.elements.description.value;

      if (title) {
        var todo = {
          id: uuid.v4(),
          title: title,
          description: description,
          date: moment().valueOf()
        };

        this.props.saveTodo(todo);

        e.target.elements.title.value = '';
        e.target.elements.description.value = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { onSubmit: this.addTodo, className: 'mb-2' },
        React.createElement('input', { type: 'text', name: 'title', className: 'mb-2 form-control', placeholder: 'Title' }),
        React.createElement('textarea', { name: 'description', className: 'mb-2 form-control', placeholder: 'Description' }),
        React.createElement(
          'button',
          { className: 'btn btn-sm btn-success' },
          'Add Todo'
        )
      );
    }
  }]);

  return AddTodo;
}(React.Component);

var Header = function Header() {
  return React.createElement(
    'h1',
    { className: 'mb-2' },
    'A Simple React Todos Application'
  );
};

ReactDOM.render(React.createElement(TodoApp, null), appRoot);
