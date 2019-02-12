import React, { Component } from 'react'
import axios from 'axios';


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
        <button onClick={() => this.props.deleteNote(this.state.note._id)}>Delete</button>
      </div>
    )
  }
}

export default Note;
