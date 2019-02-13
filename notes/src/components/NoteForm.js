import React, { Component } from 'react'

import axios from 'axios';

export class NoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
       title: '',
       textBody: ''
    }
  }

  componentDidMount = () => {
    if(this.props.update) {
      axios.get(`https://fe-notes.herokuapp.com/note/get/${this.props.match.params.id}`)
        .then(response => {
          this.setState({
            title: response.data.title,
            textBody: response.data.textBody
          })
        })
    }
  }
  

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addNote = e => {
    e.preventDefault();
    this.props.addNote(this.state)
    this.setState({ 
      title: '',
      textBody: ''
    })
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.addNote}>
          <input 
            type="text"
            name="title"
            value={this.state.title}
            placeholder="Title..."
            onChange={this.handleChange}
          >
          </input>
          <textarea
            name="textBody"
            value={this.state.textBody}
            placeholder="Note content..."
            onChange={this.handleChange}
            rows="10"
            cols="36"
          >
          </textarea>
          <button type="submit">Add note</button>
        </form>
      </div>
    )
  }
}

export default NoteForm;
