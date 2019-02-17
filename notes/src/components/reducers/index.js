import { LOADING, SUCCESS, SELECT, DRAGGED } from '../actions'

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
      return { ...state, notes: [], fetching: true }
    case SELECT:
      return { ...state, selectedID: action.id }
    case DRAGGED:
      return { ...state, notes: action.payload }
    default:
      return state;
  }
}