import axios from 'axios';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const SELECT = 'SELECT';
export const DRAGGED = 'DRAGGED';
export const QUERY = 'QUERY';
export const CLEAR = 'CLEAR';
export const ADD_DELETE = 'ADD_DELETE '

export const toggleLoading = () => {
  return { type: LOADING }
}

export const fetchNotes = () => dispatch => {
  axios.get('https://fe-notes.herokuapp.com/note/get/all')
      .then(response => {
        dispatch({ type: SUCCESS, payload: response.data })
      })
      .catch(err => {
        console.log(err);
      })
}

export const addNote = (newNote, oldNotes) => dispatch => {
  let newState = [ ...oldNotes ];
  axios.post('https://fe-notes.herokuapp.com/note/create', newNote)
    .then(response => {
      axios.get(`https://fe-notes.herokuapp.com/note/get/${response.data.success}`)
        .then(res => {
          newState.push(res.data);
          dispatch({ type: SUCCESS, payload: newState })
        })
    })
    .catch(err => {
      console.log(err);
    })
}

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
      dispatch({ type: SUCCESS, payload: newState })
    })
}

export const deleteNote = (id, oldNotes) => dispatch => {
  let newState = [];
  axios.delete(`https://fe-notes.herokuapp.com/note/delete/${id}`)
    .then(() => {
      newState = oldNotes.filter(note => note._id !== id)
      dispatch({ type: SUCCESS, payload: newState})
    })
}

export const amendDeleteList = (id, oldDeletes, deletable) => {
  let temp = [...oldDeletes];

  if(!deletable) {
    temp.push(id);
  } else {
    temp = temp.filter(item => item !== id)
  }
  
  let newDeletes = [...new Set(temp)];
  console.log(newDeletes);
  return { type: ADD_DELETE, payload: newDeletes }
}

export const deleteAll = (deletes, oldState) => {
  let newState = [];
  newState = oldState.filter(note => !deletes.includes(note._id));
  return { type: SUCCESS, payload: newState }
}

export const search = (query, notes) => {
  let foundItems = notes
                  .filter(note => 
                    note.title.toLowerCase().includes(query.toLowerCase()) || note.textBody.toLowerCase().includes(query.toLowerCase())
                  )
                  .map(el => el._id)
  return { type: QUERY, payload: foundItems }
}

export const dragSort = notes => {
  return { type: DRAGGED, payload: notes }
}

export const selectNote = id => {
  return { type: SELECT, id: id }
}

export const clearSearch = () => {
  return { type: CLEAR }
}