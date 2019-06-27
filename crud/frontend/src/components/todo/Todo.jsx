import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'


const headerProps = {
  icon: 'pencil',
  title: 'Lista de tarefas',
  subtitle: 'Tarefas: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/todo'
const initialState = {
  todo: { date: '', job: ''},
  list: []
}

export default class Todo extends Component {
  state = { ...initialState }

  componentWillMount() {
    axios(baseUrl).then(resp => {
      this.setState({ list: resp.data })
    })
  }

  clear() {
    this.setState({ todo: initialState.todo })
  }

  save() {
    const todo = this.state.todo
    const method = todo.id ? 'put' : 'post'
    const url = todo.id ? `${baseUrl}/${todo.id}` : baseUrl
    axios[method](url, todo)
      .then(resp => {
        const list = this.getUpdatedList(resp.data)
        this.setState({ todo: initialState.todo, list })
      })
  }

  getUpdatedList(todo, add = true) {
    const list = this.state.list.filter(u => u.id !== todo.id)
    if(add) list.unshift(todo)
    return list
  }

  updateField(event) {
    const todo = { ...this.state.todo }
    todo[event.target.name] = event.target.value
    this.setState({ todo })
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Tarefa</label>
              <input type="text" className="form-control"
                name="job"
                value={this.state.todo.job}
                onChange={e => this.updateField(e)}
                placeholder="Digite a tarefa a realizar..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Data</label>
              <input type="date" className="form-control"
                name="date"
                value={this.state.todo.date}
                onChange={e => this.updateField(e)}
                placeholder="Digite a data"
              />
            </div>
          </div>
        </div>

        <hr/>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary"
              onClick={e => this.save(e)}>
              Salvar
            </button>
            <button className="btn btn-secondary ml-2"
              onClick={e => this.clear(e)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
      
    )
  }


  load(todo) {
    this.setState({ todo })
  }
  
  remove(todo) {
    axios.delete(`${baseUrl}/${todo.id}`).then(resp => {
      // const list = this.state.list.filter(u => u !== todo)
      const list = this.getUpdatedList(todo, false)
      this.setState({ list })
    })
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Data</th>
            <th>Tarefa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderRows() {
    return this.state.list.map(todo => {
      return (
        <tr key={todo.id}>
          <td>{todo.date}</td>
          <td>{todo.job}</td>
          <td>
            <button className="btn btn-warning"
              onClick={() => this.load(todo)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-warning ml-2 bg-danger"
              onClick={() => this.remove(todo)}>
              <i className="fa fa-trash text-white"></i>
            </button>

          </td>
        </tr>
      )
    })
  }

  render() {
   
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    )
  }
}