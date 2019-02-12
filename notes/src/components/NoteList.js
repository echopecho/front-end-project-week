import React from 'react'
import NoteCard from './NoteCard';

import { Link } from 'react-router-dom';

const NoteList = props => {
  return (
    <div>
      {props.notes.map(note => (
        <Link to={`/notes/${note._id}`} key={note._id}>
          <NoteCard note={note}  />
        </Link>
      ))}
    </div>
  )
}

export default NoteList;