import React, { Component } from 'react';
import { fetchNotes, deleteNote } from './actions';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { NoteContainer, EditButtons, DeleteModal } from './note-style';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';


export class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: null,
      deletePrompt: false
    }
  }
  
  componentDidMount() {
    let id = this.props.id;
    axios.get(`https://fe-notes.herokuapp.com/note/get/${id}`)
      .then(response => {
        this.setState({ note: response.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidUpdate() {
    let id = this.props.id;
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
    this.props.deleteNote(this.state.note._id, this.props.notes);
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
        <ReactMarkdown source={`## ${this.state.note.title}\n\n ${this.state.note.textBody}`} />
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

const mapStateToProps = state => {
  return {
    notes: state.notes,
    id: state.selectedID
  }
}

export default connect(mapStateToProps, { fetchNotes, deleteNote })(Note);
