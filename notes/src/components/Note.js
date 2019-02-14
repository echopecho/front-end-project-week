import React, { Component } from 'react'

import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoteContainer = styled.div `
  width: 75%;
  background-color: #F2F1F2;
  margin-left: 25%;
  padding: 30px 15px;
  height: 100vh;
  position: relative;
`

const EditButtons = styled.div `
  position: absolute;
  top: 15px;
  right: 5%;

  button, a button {
    background: none;
    border: none;
    text-decoration: underline;
    font-weight: bold;
  }
`

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
      <NoteContainer>
        <h2>{this.state.note.title}</h2>
        <p>{this.state.note.textBody}</p>
        <EditButtons>
          <Link to={`/update/${this.state.note._id}`}>
            <button>edit</button>
          </Link>
          <button onClick={this.deleteNote}>delete</button>
        </EditButtons>
      </NoteContainer>
    )
  }
}

export default Note;
