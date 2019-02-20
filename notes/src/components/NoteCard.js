import React from 'react'
import { selectNote } from './actions';

import styled from 'styled-components';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';



const CardContainer = styled.div `
  border: 1px solid black;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #fff;
  overflow: hidden;
  // white-space: no-wrap;
  // text-overflow: ellipsis;

  &.found {
    background-color: red;
  }
  
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

  .text-body {
    padding-top: 3px;
    line-height: 1.25;
    overflow: hidden;
    text-wrap: wrap;
  }
`

const NoteCard = props => {
  return (
    <CardContainer 
      onClick={() => props.selectNote(props.note._id)}
      className={ props.foundItems.includes(props.note._id) ? "found" : null }
    >
      <h3>{props.note.title}</h3>
      <ReactMarkdown 
        className="text-body" 
        source={props.note.textBody}
        disallowedTypes={['link']}
      />
    </CardContainer>
  )
}

const mapStateToProps = state => {
  return {
    foundItems: state.foundItems
  }
}

export default connect(mapStateToProps, { selectNote })(NoteCard);
