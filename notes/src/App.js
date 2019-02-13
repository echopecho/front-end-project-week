import React, { Component } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NoteNav from './components/NoteNav';
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

  updateNote = (note, id) => {
    axios.put(`https://fe-notes.herokuapp.com/note/edit/${id}`, note)
      .then(() => {
        this.fetchNotes();
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteNote = id => {
    axios.delete(`https://fe-notes.herokuapp.com/note/delete/${id}`)
      .then(() => {
        this.fetchNotes();
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
        <Route path="/" component={NoteNav} />
        <Route exact path="/"
          render={() => (
            <NoteList notes={this.state.notes} />
          )}
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
              addNote={this.addNote}
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
              notes={this.state.notes}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
