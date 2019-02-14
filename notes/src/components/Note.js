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
  white-space: pre-line;
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
    cursor: pointer;
  }
`

const DeleteModal = styled.div `
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center
  background-color: rgba(0,0,0,0.3);
  width: 100vw;
  height: 100vh;
  margin-left: -27%;
  padding: 0;

  .modal-box {
    width: 40%;
    height: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #FBFAFB;

    .buttons {
      width: 100%;
      display: flex;
      justify-content: center;


      button {
        width: 30%;
        height: 32px;
        margin: 0 8px;
        border: none;
        color: #fff;
        font-weight: bold;
      }

      .confirm {
        background-color: #CA001A;
      }

      .deny {
        background-color: #24B8BD;
      }
    }
  }
`

export class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: null,
      deletePrompt: false
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

  confirmDelete = () => {
    this.setState({ deletePrompt: !this.state.deletePrompt })
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
          <button onClick={this.confirmDelete}>delete</button>
        </EditButtons>
        {this.state.deletePrompt ? 
          <DeleteModal>
            <div className="modal-box">
              <p>Are you sure you want to delete this?</p>
              <div className="buttons">
                <button className="confirm" onClick={this.deleteNote}>Delete</button>
                <button className="deny" onClick={this.confirmDelete}>No</button>
              </div>
            </div>
          </DeleteModal> : null}
      </NoteContainer>
    )
  }
}

export default Note;
