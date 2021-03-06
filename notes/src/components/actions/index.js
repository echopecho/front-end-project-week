import axios from 'axios';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const SELECT = 'SELECT';
export const DRAGGED = 'DRAGGED';
export const QUERY = 'QUERY';
export const CLEAR = 'CLEAR';
export const ADD_DELETE = 'ADD_DELETE';

export const toggleLoading = () => {
  return { type: LOADING }
}


// Make a get request to the server to get all of the notes.
//   => App.js, Note.js
export const fetchNotes = () => dispatch => {
  axios.get('https://fe-notes.herokuapp.com/note/get/all')
      .then(response => {
        dispatch({ type: SUCCESS, payload: response.data });
      })
      .catch(err => {
        console.log(err);
      })
}


// Make a post request to create a new note on the server then update store
//   => NoteForm.js
export const addNote = (newNote, oldNotes) => dispatch => {
  let newState = [ ...oldNotes ];
  axios.post('https://fe-notes.herokuapp.com/note/create', newNote)
    .then(response => {
      axios.get(`https://fe-notes.herokuapp.com/note/get/${response.data.success}`)
        .then(res => {
          newState.push(res.data);     
          dispatch({ type: SUCCESS, payload: newState });
        })
    })
    .catch(err => {
      console.log(err);
    })
}


// Make put request then cycle through and update post with matching ID
//   => NoteForm.js
export const updateNote = (note, id, oldNotes) => dispatch => {
  let newState = [];
  axios.put(`https://fe-notes.herokuapp.com/note/edit/${id}`, note)
    .then(response => {
      newState = oldNotes.map(e => {
        if(id === e._id) {
          return { ...e, title: response.data.title, textBody: response.data.textBody }
        } else {
          return { ...e }
        }
      })
      dispatch({ type: SUCCESS, payload: newState });
    })
}


// Make delete request and filter out note with matching ID
//   => NoteForm.js
export const deleteNote = (id, oldNotes) => dispatch => {
  let newState = [];
  axios.delete(`https://fe-notes.herokuapp.com/note/delete/${id}`)
    .then(() => {
      newState = oldNotes.filter(note => note._id !== id);
      dispatch({ type: SUCCESS, payload: newState});
    })
}


// Manage a lists of ID's the user has selected to delete from the NoteList
//   => NoteCard.js
export const amendDeleteList = (id, oldDeletes, deletable) => {
  let temp = [...oldDeletes];

  if(!deletable) {
    temp.push(id);
  } else {
    temp = temp.filter(item => item !== id);
  }
  // Return an array of unique values incase an ID is added multiple times
  let newDeletes = [...new Set(temp)];
  return { type: ADD_DELETE, payload: newDeletes }
}


// Filter the store to reflect what was selected to be deleted in the deleteList array
//   => NoteNav.js
export const deleteAll = (deletes, oldState) => {
  let newState = oldState.filter(note => !deletes.includes(note._id));
  return { type: SUCCESS, payload: newState }
}


// Return a list of IDs that contain matches to the search query
//   => NoteList.js
export const search = (query, notes) => {
  let foundItems = notes
                  .filter(note => 
                    note.title.toLowerCase().includes(query.toLowerCase()) || 
                    note.textBody.toLowerCase().includes(query.toLowerCase())
                  )
                  .map(el => el._id);
  return { type: QUERY, payload: foundItems }
}


//   => NoteList.js
export const dragSort = notes => {
  return { type: DRAGGED, payload: notes }
}

//   => NoteCard.js
export const selectNote = id => {
  return { type: SELECT, id: id }
}

//   => NoteList.js
export const clearSearch = () => {
  return { type: CLEAR }
}