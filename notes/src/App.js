import React, { Component } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Note from './components/Note';

import { Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
       notes: []
    }
  }

  componentDidMount = () => {
    this.fetchNotes();
  }

  addNote = note => {
    axios.post('https://fe-notes.herokuapp.com/note/create', note)
      .then(() => {
        this.fetchNotes();
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteNote = id => {
    axios.delete(`https://fe-notes.herokuapp.com/note/delete/${id}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  fetchNotes = () => {
    axios.get('https://fe-notes.herokuapp.com/note/get/all')
      .then(response => {
        this.setState({ notes: response.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/"
          render={props => (
            <NoteList notes={this.state.notes} />
          )}
        />
        <Route 
          path="/notes/:id"
          render={props => (
            <Note 
              deleteNote={this.deleteNote}
              match={props.match}
            />
          )}
        />
        <Route
          path="/add"
          render={props => (
            <NoteForm 
              addNote={this.addNote}
              history={props.history}
            />
          )} 
        />
      </div>
    );
  }
}

export default App;
