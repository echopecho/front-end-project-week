import React from 'react';
import NoteCard from './NoteCard';

import { MainContainer, MainHeader, ListContainer } from './note-list-style';
import { connect } from 'react-redux';
import MuuriGrid from 'react-muuri';
import { dragSort, search, toggleLoading, clearSearch } from './actions';


class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: ''
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.grid = new MuuriGrid({
        node: this.gridElement,
        defaultOptions: {
          dragEnabled: true,
          dragStartPredicate: { // ** Required to allow click events to functions properly **
            distance: 1,
            delay: 0,
            handle: false
          }
        }
      });

      let dragElements = this.grid.grid._element.childNodes
      
      this.grid.getMethod('on', 'dragEnd', () => {
        let arrSorted = [];

        // Match the DOM with what is displayed after dropping element
        this.grid.getMethod('synchronize');

        // Match the Store with the DOM
        dragElements.forEach(e => {
          let sorted = this.props.notes.filter(note => note._id === e.dataset.id);
          arrSorted.push(sorted[0]);
        })
        this.props.dragSort(arrSorted);
        
      })

    }, 400);
  }

  componentDidUpdate() {
    // Adjust the layout when items are deleted from the list view.
    if(this.grid) {
      this.grid.getMethod('refreshItems');
      this.grid.getMethod('layout');
    }
  }

  componentWillUnmount() {
    this.grid.getMethod('destroy');
  }

  inputChange = e => {
    this.setState({ textInput: e.target.value })
  }

  submitSearch = e => {
    e.preventDefault();
    this.props.search(this.state.textInput, this.props.notes);
    this.setState({ textInput: '' })
  }

  render() {
    return (
      <MainContainer>
        <MainHeader>
          <h2>Your Notes:</h2>
          {!this.props.activeSearch ?
            <form onSubmit={this.submitSearch}>
              <input 
                type="text"
                value={this.state.textInput}
                placeholder="search"
                onChange={this.inputChange}
              >
              </input>
            </form> :
            <div onClick={this.props.clearSearch}>Clear Search</div>
          }
        </MainHeader>        
        <ListContainer ref={gridElement => this.gridElement = gridElement}>
          {this.props.error ? <p>{this.props.error}</p> : null}
          {this.props.notes.map(note => (
            <div className="item" key={note._id} data-id={note._id}>
              <div className="item-content">
                <NoteCard note={note} />
              </div>
            </div>
          ))}
        </ListContainer>
      </MainContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    loading: state.fetching,
    activeSearch: state.activeSearch,
    error: state.error
  }
}

export default connect(mapStateToProps, { dragSort, search, toggleLoading, clearSearch } )(NoteList);