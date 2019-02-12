import React, { Component } from 'react';
import './App.css';
import NoteList from './components/NoteList';
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
          component={Note}
        />
      </div>
    );
  }
}

export default App;
