import styled from 'styled-components';

export const NavContainer = styled.div `
  display: flex;
  position: fixed;
  width: 25%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #D3D2D3;

  h1 {
    display: inline-block;
    width: 100%;
    padding: 10%;
    line-height: .8;
    margin: 0;
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

  div img {
    width: 200px;
    height: 200px;
    cursor: pointer;
  }
`

export const FormContainer = styled.div `
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

export const NoteContainer = styled.div `
  width: 75%;
  background-color: #F2F1F2;
  margin-left: 25%;
  padding: 30px 15px;
  height: 100vh;
  position: relative;
  white-space: pre-line;
`

export const EditButtons = styled.div `
  position: absolute;
  top: 15px;
  right: 5%;

  button, a button {
    background: none;
    border: none;
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
  }
`

export const DeleteModal = styled.div `
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center
  background-color: rgba(0,0,0,0.3);
  width: 100vw;
  height: 100vh;
  margin-left: -27%;
  padding: 0;

  .modal-box {
    width: 35%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #FBFAFB;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.3);

    .buttons {
      width: 100%;
      display: flex;
      justify-content: center;

      button {
        width: 30%;
        height: 32px;
        margin: 0 8px;
        border: none;
        color: #fff;
        font-weight: bold;
      }

      .confirm {
        background-color: #CA001A;
      }

      .deny {
        background-color: #24B8BD;
      }
    }
  }
`