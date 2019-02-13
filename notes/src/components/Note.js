import React, { Component } from 'react'

import axios from 'axios';
import { Link } from 'react-router-dom';

export class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: null
    }
  }
  
  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`https://fe-notes.herokuapp.com/note/get/${id}`)
      .then(response => {
        this.setState({ note: response.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteNote = () => {
    this.props.deleteNote(this.state.note._id);
    this.props.history.push('/');
  }
  
  render() {
    if(!this.state.note) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div>
        <h2>{this.state.note.title}</h2>
        <p>{this.state.note.textBody}</p>
        <Link to={`/update/${this.state.note._id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={this.deleteNote}>Delete</button>
      </div>
    )
  }
}

export default Note;
