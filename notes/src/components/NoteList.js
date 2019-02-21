import React from 'react'
import NoteCard from './NoteCard';

// import styled from 'styled-components';
import { MainContainer, MainHeader, ListContainer } from './../components/style';
import { connect } from 'react-redux';
import MuuriGrid from 'react-muuri';
import { dragSort, search, toggleLoading, clearSearch } from './actions';
// import { Link } from 'react-router-dom';


// const MainContainer = styled.div `
//   width: 75%;
//   min-height: 100vh;
//   background-color: #F2F1F2;
//   margin-left: 25%;
//   padding-bottom: 40px;
// `

// const Header = styled.div `
//   width: 100%;
//   padding: 20px 20px 0;
//   display: flex;
//   justify-content: space-between;

//   h2 {
//     margin: 0;
//   }

//   form input {
//     padding-left: 5px;
//   }

//   div {
//     width: 15%;
//     background-color: #24B8BD;
//     color: white;
//     text-align: center;
//     border: 1px solid black;
//     margin-bottom: 5px;
//     padding-top: 1px;
//   }
// `

// const ListContainer = styled.div `
//   // display: flex;
//   // flex-wrap: wrap;
//   padding: 2%;
//   position: relative;

//   .item {
//     position: absolute;
//     width: 31%;
//     max-width: 250px;
//     height: 200px;
//     margin: 5px;
//     // z-index: 1;
//     box-shadow: 2px 2px 2px rgba(0,0,0,0.25);
//     transition: box-shadow .2s linear;

//     &.muuri-item-dragging {
//       z-index: 3;
//       box-shadow: 10px 10px 14px rgba(0,0,0,0.25);
//     }
     
//     &.muuri-item-releasing {
//       z-index: 2;
//       box-shadow: 10px 10px 14px rgba(0,0,0,0.25);
//     }
     
//     &.muuri-item-hidden {
//       z-index: 0; /* Required by Muuri */
//     }

//     .item-content {
//       position: relative;
//       width: 100%;
//       height: 100%;
//       background-color: transparent;
//       perspective: 800px;

//       a {
//         // width: 29%;
//         // margin: 20px 2%;  
//         text-decoration: none;
//       }
//        div {
//          transition: transform 1s linear;
//          transform-style: preserve-3d;
//        }

//       &:hover div {
//         transform: rotateY(180deg);
//       }
//     }
//   }
// `

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
          dragStartPredicate: {
            distance: 1,
            delay: 0,
            handle: false
          }
        },
      });

      let dragElements = this.grid.grid._element.childNodes
      
      this.grid.getMethod('on', 'dragEnd', () => {
        let arrSorted = [];
        this.grid.getMethod('synchronize')
        dragElements.forEach(e => {
          let sorted = this.props.notes.filter(note => note._id === e.dataset.id);
          arrSorted.push(sorted[0]);
        })
        
        this.props.dragSort(arrSorted);
        
      })
    }, 500);  
  }

  componentDidUpdate() {
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
          {this.props.notes.map(note => (
            <div className="item" key={note._id} data-id={note._id}>
              <div className="item-content">
                {/* <Link to={`/notes/${note._id}`}> */}
                  <NoteCard note={note} />
                {/* </Link> */}
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
    activeSearch: state.activeSearch
  }
}

export default connect(mapStateToProps, { dragSort, search, toggleLoading, clearSearch } )(NoteList);