import { LOADING, SUCCESS, SELECT, DRAGGED, QUERY, CLEAR, ADD_DELETE, FAILURE } from '../actions';

const initialState = {
  notes: [],
  fetching: false,
  selectedID: '',
  foundItems: [],
  deleteList: [],
  activeSearch: false,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SUCCESS:
      return { ...state, notes: action.payload, deleteList: [], foundItems: action.payload, fetching: false, activeSearch: false }
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
    case ADD_DELETE:
      return { ...state, deleteList: action.payload }
    case FAILURE:
      return { ...state, error: action.error }
    default:
      return state;
  }
}