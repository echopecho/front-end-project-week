import React, { Component } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import NoteNav from './components/NoteNav';
import Note from './components/Note';
import { fetchNotes } from './components/actions';

import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { AppContainer } from './components/note-list-style';
import { connect } from 'react-redux';


class App extends Component {

  componentDidMount = () => {
    this.props.fetchNotes();
  }

  render() {
    return (
      <AppContainer>
        <Route 
          path="/" 
          component={NoteNav} 
        />
        <Route 
          exact path="/"
          component={NoteList}
        />
        <Route 
          path="/notes/:id"
          component={Note}
        />
        <Route
          path="/add"
          component={NoteForm}
        />
        <Route 
          path="/update/:id"
          render={props => (
            <NoteForm 
              update
              {...props}
            />
          )}
        />
      </AppContainer>
    );
  }
}



export default withRouter(connect(null, { fetchNotes })(App));
