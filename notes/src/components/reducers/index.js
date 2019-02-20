import { LOADING, SUCCESS, SELECT, DRAGGED, QUERY, CLEAR } from '../actions'

const initialState = {
  notes: [],
  fetching: false,
  selectedID: '',
  foundItems: [],
  activeSearch: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SUCCESS:
      return { ...state, notes: action.payload, foundItems: action.payload, fetching: false };
    case LOADING:
      return { ...state, fetching: !state.fetching }
    case SELECT:
      return { ...state, selectedID: action.id }
    case DRAGGED:
      return { ...state, notes: action.payload }
    case QUERY:
      return { ...state, foundItems: action.payload, activeSearch: true }
    case CLEAR:
      return { ...state, foundItems: [], activeSearch: false }
    default:
      return state;
  }
}