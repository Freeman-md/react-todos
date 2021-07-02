const appRoot = document.getElementById('app')

const getTodos = () => JSON.parse(localStorage.getItem('todos')) || []

const addTodo = (e) => {
  e.preventDefault()
  const title = e.target.elements.title.value
  const description = e.target.elements.description.value

  if (title) {
    const todos = getTodos()
    const todo = {
      id: uuid.v4(), 
      title: title, 
      description: description,
      date: moment().valueOf()
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
    
    e.target.elements.title.value = ''
    e.target.elements.description.value = ''

    render()
  }
}

const renderTodos = () => getTodos().sort((a, b) => a.date >= b.date ? -1 : 1 ).map((todo) => generateDOM(todo))

const generateDOM = (todo) => (
    <li className="list-group-item d-flex justify-content-between align-items-start" id={todo.id} key={todo.id}>
      <div className="ms-2 me-auto">
        <div className="fw-bold">{todo.title}</div>
        {todo.description}
      </div>
      <button className="badge bg-primary rounded-pill" onClick={(e) => removeTodo(e, todo.id)}>
        &times;
      </button>
    </li>
)

const removeTodo = (e, id) => {
  localStorage.setItem('todos', JSON.stringify(getTodos().filter(todo => todo.id != id)))
  render()
}

const render = () => {

  const todos = getTodos()

  const template = (
    <div className="container">
      <div class="row">
        <div class="col-md-6 col-sm-8 col-12 offset-md-3 offset-sm-2">
          <h1>Todo Application</h1>
          <h4>Todos</h4>
          {todos && <ol className="list-group mb-2 list-group-numbered list-group-flush" id="todos">
            {renderTodos()}
          </ol>}
          <form onSubmit={addTodo}>
            <input type="text" name="title" className="form-control mb-2" placeholder="Title"/>
            <textarea  name="description" className="form-control mb-2" placeholder="Description"></textarea>
            <button className="btn btn-sm btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
  
  ReactDOM.render(template, appRoot)
}

render()