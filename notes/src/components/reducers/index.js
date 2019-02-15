import { LOADING, SUCCESS, SELECT } from '../actions'

const initialState = {
  notes: [],
  fetching: false,
  selectedID: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SUCCESS:
      return { ...state, notes: action.payload, fetching: false };
    case LOADING:
      return { ...state, note: [], fetching: true }
    case SELECT:
      return { ...state, selectedID: action.id }
    default:
      return state;
  }
}