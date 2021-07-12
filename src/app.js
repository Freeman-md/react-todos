const appRoot = document.getElementById('app')

class TodoApp extends React.Component {
  constructor(props) {
    super(props)
    this.removeTodo = this.removeTodo.bind(this)
    this.loadTodos = this.loadTodos.bind(this)
    this.saveTodos = this.saveTodos.bind(this)
    this.state = {
      todos: []
    }
  }
  componentDidMount() {
    this.loadTodos()
  }
  removeTodo(id) {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(todo => todo.id != id)
    }))
    this.saveTodos()
  }
  loadTodos() {
    this.setState(() => ({
      todos: JSON.parse(localStorage.getItem('todos')) || []  
    }))
  }
  saveTodos(todo) {
    const todos = this.state.todos
    if (todo) {
      todos.push(todo)
      this.setState(() => ({ todos }))
    }
    
    localStorage.setItem('todos', JSON.stringify(this.state.todos))
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="py-2 col-md-6 col-sm-8 col-12 offset-md-3 offset-sm-2">
            <Header />
            <AddTodo saveTodo={this.saveTodos} />
            <Todos todos={this.state.todos} removeTodo={this.removeTodo} />
          </div>
        </div>
      </div>
    )
  }
}

class Todos extends React.Component {
  constructor(props) {
    super(props)
    this.renderTodos = this.renderTodos.bind(this)
  }
  renderTodos() {
    return this.props.todos.sort((a, b) => a.date >= b.date ? -1 : 1 ).map((todo) => <Todo key={todo.id} todo={todo} removeTodo={this.props.removeTodo} />)
  }
  render() {
    return (
      <div>
        {this.props.todos.length > 0 && <h4>Todos</h4>}
        {this.props.todos && <ol className="mb-2 list-group list-group-numbered list-group-flush" id="todos">
          {this.renderTodos()}
        </ol>}
      </div>
    )
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-start" id={this.props.todo.id}>
        <div className="ms-2 me-auto">
          <div className="fw-bold">{this.props.todo.title}</div>
          {this.props.todo.description}
        </div>
        <button className="badge bg-primary rounded-pill" onClick={(e) => this.props.removeTodo(this.props.todo.id)}>
          &times;
        </button>
      </li>
    )
  }
}

class AddTodo extends React.Component {
  constructor(props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
  }
  addTodo(e) {
    e.preventDefault()
    const title = e.target.elements.title.value
    const description = e.target.elements.description.value

    if (title) {
      const todo = {
        id: uuid.v4(), 
        title: title, 
        description: description,
        date: moment().valueOf()
      }

      this.props.saveTodo(todo)
      
      e.target.elements.title.value = ''
      e.target.elements.description.value = ''
    }
  }
  render() {
    return (
      <form onSubmit={this.addTodo} className="mb-2">
        <input type="text" name="title" className="mb-2 form-control" placeholder="Title"/>
        <textarea  name="description" className="mb-2 form-control" placeholder="Description"></textarea>
        <button className="btn btn-sm btn-success">Add Todo</button>
      </form>
    )
  }
}

const Header = () => {
  return (
    <h1 className="mb-2">A Simple React Todos Application</h1>
  )
}

ReactDOM.render(<TodoApp />, appRoot)