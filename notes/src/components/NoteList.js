import React from 'react'
import Note from './Note';

const NoteList = props => {
  return (
    <div>
      {props.notes.map(note => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  )
}

export default NoteList;