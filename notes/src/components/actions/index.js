import axios from 'axios';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const SELECT = 'SELECT';

export const fetchNotes = () => dispatch => {
  dispatch({ type: LOADING });
  axios.get('https://fe-notes.herokuapp.com/note/get/all')
      .then(response => {
        dispatch({ type: SUCCESS, payload: response.data})
      })
      .catch(err => {
        console.log(err);
      })
}

export const selectNote = id => {
  return { type: SELECT, id: id }
}