import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components';

const NavContainer = styled.div `
  display: flex;
  position: fixed;
  width: 25%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #D3D2D3;

  h1 {
    display: inline-block;
    padding-left: 12%;
    line-height: .8;
    margin-bottom: 20px;
  }
  
  a {
    width: 80%;
    cursor: default;

    button {
      width: 100%;
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

const NoteNav = props => {
  return (
    <NavContainer>
      <h1>Lambda Notes</h1>
      <Link to="/">
        <button>View Your Notes</button>
      </Link>
      <Link to="/add">
        <button>+ Create New Note</button>
      </Link>
    </NavContainer>
  )
}

export default NoteNav;
