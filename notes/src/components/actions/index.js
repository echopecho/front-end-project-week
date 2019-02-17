import axios from 'axios';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const SELECT = 'SELECT';
export const DRAGGED = 'DRAGGED';

export const fetchNotes = () => dispatch => {
  // dispatch({ type: LOADING });
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

export const dragSort = notes => {
  return { type: DRAGGED, payload: notes }
}

export const selectNote = id => {
  return { type: SELECT, id: id }
}