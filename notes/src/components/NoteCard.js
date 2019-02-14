import React from 'react'

import styled from 'styled-components';

const CardContainer = styled.div `
  border: 1px solid black;
  // width: 100%;
  height: 200px;
  padding: 10px;
  background-color: #fff;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
  
  h3, p {
    color: black;
    margin: 0;
    overflow-wrap: break-word;
  }

  h3 {
    border-bottom: 1px solid black;
    padding-bottom: 3px;
  }

  p {
    padding-top: 3px;
    line-height: 1.25;
    overflow: hidden;
    text-wrap: wrap;
    // white-space: nowrap;
    // text-overflow: ellipsis;
  }
`

const NoteCard = props => {
  return (
    <CardContainer>
      <h3>{props.note.title}</h3>
      <p>{props.note.textBody}</p>
    </CardContainer>
  )
}

export default NoteCard;
