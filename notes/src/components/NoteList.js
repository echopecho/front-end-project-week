import React from 'react'
import NoteCard from './NoteCard';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MuuriGrid from 'react-muuri';

const MainContainer = styled.div `
  width: 75%;
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
  display: flex;
  flex-wrap: wrap;
  padding: 2%;
  position: relative;

  .item {
    position: absolute;
    width: 20%;
    height: 50px;

    .item-content {

      a {
        width: 29%;
        margin: 20px 2%;  
        text-decoration: none;
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
    console.log(this.gridElement)
    this.grid = new MuuriGrid({
      node: this.gridElement,
      defaultOptions: {
        dragEnabled: true
      },
    });
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
                <Link to={`/notes/${note._id}`}>
                  <NoteCard note={note}  />
                </Link>
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