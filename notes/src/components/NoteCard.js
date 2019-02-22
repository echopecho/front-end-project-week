import React from 'react'
import { selectNote, amendDeleteList } from './actions';

import { CardContainer, CardFront, CardBack } from './note-list-style';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';


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
      className={`${this.state.delete ? "delete" : ""} ${this.props.foundItems.includes(this.props.note._id) ? "found" : this.props.searched ? "not-found" : ""}` }
    >
      <CardFront>
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
      </CardFront>
      <CardBack>
        <h3>{this.props.note.title}</h3>
        <button onClick={this.toggleDelete}>Undo</button>
      </CardBack>
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
