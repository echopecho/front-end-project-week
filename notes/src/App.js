import React, { Component } from 'react';
// import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NoteNav from './components/NoteNav';
import Note from './components/Note';
import { fetchNotes } from './components/actions';

import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { connect } from 'react-redux';

const AppContainer = styled.div `
  width: 100%
`

class App extends Component {

  componentDidMount = () => {
    this.props.fetchNotes();
  }

  // addNote = note => {
  //   axios.post('https://fe-notes.herokuapp.com/note/create', note)
  //     .then(() => {
  //       this.props.fetchNotes();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  updateNote = (note, id) => {
    axios.put(`https://fe-notes.herokuapp.com/note/edit/${id}`, note)
      .then(() => {
        this.props.fetchNotes();
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteNote = id => {
    axios.delete(`https://fe-notes.herokuapp.com/note/delete/${id}`)
      .then(() => {
        this.props.fetchNotes();
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  // fetchNotes = () => {
  //   axios.get('https://fe-notes.herokuapp.com/note/get/all')
  //     .then(response => {
  //       this.setState({ notes: response.data })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  render() {
    return (
      <AppContainer>
        <Route path="/" component={NoteNav} />
        <Route exact path="/"
          component={NoteList}
        />
        <Route 
          path="/notes/:id"
          render={props => (
            <Note 
              deleteNote={this.deleteNote}
              {...props}
            />
          )}
        />
        <Route
          path="/add"
          render={props => (
            <NoteForm 
              history={props.history}
            />
          )} 
        />
        <Route 
          path="/update/:id"
          render={props => (
            <NoteForm 
              update
              updateNote={this.updateNote}
              {...props}
            />
          )}
        />
      </AppContainer>
    );
  }
}



export default withRouter(connect(null, { fetchNotes })(App));
