import React from 'react'
import NoteCard from './NoteCard';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainContainer = styled.div `
  width: 75%;
  background-color: #F2F1F2;
  margin-left: 25%;
`

const Header = styled.div `
  padding: 20px 20px 0;

  h2 {
    margin: 0;
  }
`

const ListContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  padding: 2%;
 
  
  a {
    width: 29%;
    margin: 20px 2%;  
    text-decoration: none;
  }
`

const NoteList = props => {
  return (
    <MainContainer>
      <Header>
        <h2>Your Notes:</h2>
      </Header>
      <ListContainer>
        {props.notes.map(note => (
          <Link to={`/notes/${note._id}`} key={note._id}>
            <NoteCard note={note}  />
          </Link>
        ))}
      </ListContainer>
    </MainContainer>
  )
}

export default NoteList;