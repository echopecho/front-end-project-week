import React from 'react';
import { deleteAll } from './actions';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavContainer } from './note-style';


class NoteNav extends React.Component {

  confirmDeleteAll = () => {
    this.props.listToDelete.forEach(note => {
      axios.delete(`https://fe-notes.herokuapp.com/note/delete/${note}`)
    })
    this.props.deleteAll(this.props.listToDelete, this.props.notes);
  }

  render() {
  return (
    <NavContainer>
      <h1>Lambda<br/>Notes</h1>
      <Link to="/">
        <button>View Your Notes</button>
      </Link>
      <Link to="/add">
        <button>+ Create New Note</button>
      </Link>
      {this.props.listToDelete.length > 0 
        ? 
        <div onClick={this.confirmDeleteAll}>
          <img src={require('./../img/trashcan.png')} alt="" />
        </div> 
        :
        null
      }
    </NavContainer>
  )
  }
}

const mapStateToProps = state => {
  return {
    listToDelete: state.deleteList,
    notes: state.notes
  }
}

export default connect(mapStateToProps, { deleteAll })(NoteNav);
