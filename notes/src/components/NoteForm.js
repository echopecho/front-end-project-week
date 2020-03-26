import React, { Component } from "react";

import axios from "axios";
import { FormContainer } from "./note-style";
import { connect } from "react-redux";
import { addNote, updateNote, base_url } from "./actions";

export class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      textBody: ""
    };
  }

  componentDidMount = () => {
    if (this.props.update) {
      axios
        .get(`${base_url}/get/${this.props.match.params.id}`)
        .then(response => {
          this.setState({
            title: response.data.title,
            textBody: response.data.textBody
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitNote = async e => {
    e.preventDefault();
    if (this.props.update) {
      this.props.updateNote(
        this.state,
        this.props.match.params.id,
        this.props.notes
      );
      setTimeout(() => {
        this.props.history.push(`/notes/${this.props.match.params.id}`);
      }, 400);
    } else {
      this.props.addNote(this.state, this.props.notes);
      this.props.history.push(`/`);
    }
  };

  render() {
    return (
      <FormContainer>
        <div>
          <h2>{this.props.update ? "Update Note:" : "Create New Note:"}</h2>
        </div>
        <form onSubmit={this.submitNote}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            placeholder="Note Title"
            onChange={this.handleChange}
          ></input>
          <textarea
            name="textBody"
            value={this.state.textBody}
            placeholder="Note Content"
            onChange={this.handleChange}
            rows="10"
            cols="36"
          ></textarea>
          <button type="submit">{this.props.update ? "Update" : "Save"}</button>
        </form>
      </FormContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

export default connect(mapStateToProps, { addNote, updateNote })(NoteForm);
