import React from 'react'
import { deleteAll } from './actions';

import axios from 'axios';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import styled from 'styled-components';

const NavContainer = styled.div `
  display: flex;
  position: fixed;
  width: 25%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #D3D2D3;

  h1 {
    display: inline-block;
    width: 100%;
    padding: 10%;
    line-height: .8;
    margin: 0;
  }
  
  a {
    width: 80%;
    cursor: default;

    button {
      width: 100%;
      height: 36px;
      margin-bottom: 20px;
      background-color: #24B8BD;
      font-weight: bold;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }
  }

  div img {
    width: 200px;
    height: 200px;
    cursor: pointer;
  }
`

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
      {this.props.listToDelete.length > 0 ? 
        <div onClick={this.confirmDeleteAll}>
          <img src={require('./../img/trashcan.png')} alt="" />
        </div> :
        // <button onClick={this.confirmDeleteAll}>Delete All</button> :
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
