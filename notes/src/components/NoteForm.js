import React, { Component } from 'react';

import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div `
  width: 75%;
  background-color: #F2F1F2;
  margin-left: 25%;
  height: 100vh;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;

    input {
      width: 55%;
      height: 28px;
      margin-bottom: 20px;
      padding: 0 7px;
    }

    textarea {
      height: 300px;
      margin-bottom: 20px;
      padding: 15px;
    }

    button {
      width: 30%;
      height: 36px;
      margin-bottom: 20px;
      background-color: #24B8BD;
      font-weight: bold;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }
  }
`

export class NoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
       title: '',
       textBody: ''
    }
  }

  componentDidMount = () => {
    if(this.props.update) {
      axios.get(`https://fe-notes.herokuapp.com/note/get/${this.props.match.params.id}`)
        .then(response => {
          this.setState({
            title: response.data.title,
            textBody: response.data.textBody
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitNote = e => {
    e.preventDefault();
    if(this.props.update) {
      this.props.updateNote(this.state, this.props.match.params.id);

    } else {
      this.props.addNote(this.state);
      this.props.history.push('/');
    }
  }
  
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
          >
          </input>
          <textarea
            name="textBody"
            value={this.state.textBody}
            placeholder="Note Content"
            onChange={this.handleChange}
            rows="10"
            cols="36"
          >
          </textarea>
          <button type="submit">{this.props.update ? "Update" : "Save"}</button>
        </form>
      </FormContainer>
    )
  }
}

export default NoteForm;
