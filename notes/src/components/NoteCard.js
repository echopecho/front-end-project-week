import React from 'react'
import { selectNote } from './actions';

import styled from 'styled-components';
import { connect } from 'react-redux';


const CardContainer = styled.div `
  border: 1px solid black;
  height: 200px;
  padding: 10px;
  background-color: #fff;
  overflow: hidden;
  // white-space: no-wrap;
  // text-overflow: ellipsis;
  
  h3, p {
    color: black;
    margin: 0;
    overflow-wrap: break-word;
  }

  h3 {
    border-bottom: 1px solid black;
    padding-bottom: 3px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    padding-top: 3px;
    line-height: 1.25;
    overflow: hidden;
    text-wrap: wrap;
  }
`

const NoteCard = props => {
  return (
    <CardContainer onClick={() => props.selectNote(props.note._id)}>
      <h3>{props.note.title}</h3>
      <p>{props.note.textBody}</p>
    </CardContainer>
  )
}

export default connect(null, { selectNote })(NoteCard);
