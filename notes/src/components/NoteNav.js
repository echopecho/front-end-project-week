import React from 'react'

import { Link } from 'react-router-dom'

const NoteNav = props => {
  return (
    <div>
      <h1>Lambda Notes</h1>
      <Link to="/">
        <button>View Your Notes</button>
      </Link>
      <Link to="/add">
        <button>+ Create New Note</button>
      </Link>
    </div>
  )
}

export default NoteNav;
