import React from 'react'
import { selectNote, amendDeleteList } from './actions';

import { CardContainer } from '../components/style';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';



// const CardContainer = styled.div `
//   border: 1px solid black;
//   width: 100%;
//   height: 100%;
//   // padding: 10px;
//   background-color: #fff;
//   overflow: hidden;
//   position: relative:
//   background-color: red;
//   transition: all .6s;

//   &.found {
//     background-color: #24B8BD;
//     transform: scale(1.05);
//     box-shadow: 4px 4px 4px rgba(0,0,0,0.25);

//     h3, .text-body {
//       color: white;
//     }
//   }

//   &.not-found {
//     opacity: 0.4;
//   }

//   .card-front, .card-back {
//     position: absolute;
//     overflow: hidden;
//     width: 100%;
//     height: 100%;
//     backface-visibility: hidden;
//   }

//   .card-front {

//     .card-header {
//       display: flex;
//       justify-content: space-between;
//       border-bottom: 1px solid black;

//       h3 {
//         padding-bottom: 3px;
//         overflow: hidden;
//         white-space: nowrap;
//         text-overflow: ellipsis;
//       }
//     }
//   }
  
//   h3, .text-body {
//     color: black;
//     margin: 0;
//     overflow-wrap: break-word;
//   }

//   a .text-body {
//     padding-top: 3px;
//     line-height: 1.25;
//     overflow: hidden;
//     text-wrap: wrap;
//     height: 100px;
//   }

//   .card-back {
//     transform: rotateY(180deg);
//   }
// `

class NoteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false
    }
  }

  toggleDelete = () => {
    this.props.amendDeleteList(this.props.note._id, this.props.listToDelete, this.state.delete)
    this.setState({ delete: !this.state.delete })
  }

  render() {
  return (
    <CardContainer 
      onClick={() => this.props.selectNote(this.props.note._id)}
      className={`${this.state.delete ? "delete" : null} ${this.props.foundItems.includes(this.props.note._id) ? "found" : this.props.searched ? "not-found" : null}` }
    >
      <div className="card-front">
      <div className="card-header">
        <h3>{this.props.note.title}</h3>
        <button onClick={this.toggleDelete}>X</button>
      </div>
      <Link to={`/notes/${this.props.note._id}`}>
        <ReactMarkdown 
          className="text-body" 
          source={this.props.note.textBody}
          disallowedTypes={['link', 'linkReference']}
        />
      </Link>
      </div>
      <div className="card-back">
        <h3>{this.props.note.title}</h3>
        <button onClick={this.toggleDelete}>Undo</button>
      </div>
    </CardContainer>
  )
  }
}

const mapStateToProps = state => {
  return {
    foundItems: state.foundItems,
    searched: state.activeSearch,
    listToDelete: state.deleteList
  }
}

export default connect(mapStateToProps, { selectNote, amendDeleteList })(NoteCard);
