import React from 'react'
import NoteCard from './NoteCard';

import styled from 'styled-components';
import { connect } from 'react-redux';
import MuuriGrid from 'react-muuri';

const MainContainer = styled.div `
  width: 75%;
  height: 100vh;
  background-color: #F2F1F2;
  margin-left: 25%;
`

const Header = styled.div `
  padding: 20px 20px 0;

  h2 {
    margin: 0;
  }
`

const ListContainer = styled.div `
  // display: flex;
  // flex-wrap: wrap;
  padding: 2%;
  position: relative;

  .item {
    position: absolute;
    width: 31%;
    height: 200px;
    margin: 5px;
    z-index: 1;

    &.muuri-item-dragging {
      z-index: 3;   /* Required by Muuri */
    }
     
    &.muuri-item-releasing {
      z-index: 2; /* Required by Muuri */
    }
     
    &.muuri-item-hidden {
      z-index: 0; /* Required by Muuri */
    }

    .item-content {
      position: relative;
      width: 100%;
      height: 100%;

      a {
        // width: 29%;
        // margin: 20px 2%;  
        text-decoration: none;
        z-index: 1;
      }
    }
  }
  
  // a {
  //   width: 29%;
  //   margin: 20px 2%;  
  //   text-decoration: none;
  // }
`

class NoteList extends React.Component {

  componentDidMount () {
    setTimeout(() => {
      this.grid = new MuuriGrid({
        node: this.gridElement,
        defaultOptions: {
          dragEnabled: true
        },
      });
    }, 50);
  }

  componentWillUnmount () {
    this.grid.getMethod('destroy');
  }

  render() {
    return (
      <MainContainer>
        <Header>
          <h2>Your Notes:</h2>
        </Header>
        <ListContainer ref={gridElement => this.gridElement = gridElement}>
          {this.props.notes.map(note => (
            <div className="item" key={note._id}>
              <div className="item-content">
                <NoteCard note={note}  />
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
    notes: state.notes
  }
}

export default connect(mapStateToProps)(NoteList);