import styled from 'styled-components';

export const AppContainer = styled.div `
  width: 100%
`
export const MainContainer = styled.div `
  width: 75%;
  min-height: 100vh;
  background-color: #F2F1F2;
  margin-left: 25%;
  padding-bottom: 40px;
`

export const MainHeader = styled.div `
  width: 100%;
  padding: 20px 20px 0;
  display: flex;
  position: relative;

  h2 {
    margin: 0;
  }

  form {
    position: absolute;
    right: 5%;
    width: 30%;
    max-width: 200px;

    input {
      width: 100%;
      padding-left: 5px;
    }
  }

  div {
    position: absolute;
    right: 5%;
    width: 15%;
    background-color: #24B8BD;
    color: white;
    font-weight: bold;  
    text-align: center;
    border: 1px solid black;
    margin-bottom: 5px;
    padding-top: 1px;
  }
`

export const ListContainer = styled.div `
  width: 96%;
  position: relative;
  top: 10px;
  left: 4%;

  .item {
    position: absolute;
    width: 31%;
    max-width: 250px;
    height: 200px;
    margin: 5px;
    transition: box-shadow .2s linear;

    &.muuri-item-dragging {
      z-index: 3;
      box-shadow: 10px 10px 14px rgba(0,0,0,0.25);
    }
     
    &.muuri-item-releasing {
      z-index: 2;
      box-shadow: 10px 10px 14px rgba(0,0,0,0.25);
    }
     
    &.muuri-item-hidden {
      z-index: 0;
    }

    .item-content {
      position: relative;
      width: 100%;
      height: 100%;
      perspective: 1000px;

      a {
        text-decoration: none;
      }
    }
  }
`
export const CardContainer = styled.div `
  border: 1px solid black;
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative:
  transition: all .4s;
  transition: all .4s linear;  
  transform-style: preserve-3d;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.25);


  &.found {
    background-color: #24B8BD;
    transform: scale(1.03);
    box-shadow: 6px 6px 6px rgba(0,0,0,0.25);

    h3, .text-body {
      color: white;
    }
  }

  &.not-found {
    box-shadow: 0px 0px 0px rgb(0,0,0);
  }

  &.delete {
    transform: rotateY(180deg);
  }
  
  h3, .text-body {
    color: black;
    margin: 0;
  }

  a .text-body {
    padding-top: 3px;
    line-height: 1.25;
    overflow: hidden;
    height: 160px;
  }
`

export const CardFront = styled.div `
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 5px;
}

  .card-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;

    h3 {
      padding-bottom: 3px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;  
    }

    button {
      width: 26px;
      height: 26px;
      background-color: #24B8BD;
      color: white;
      font-weight: bold;
      border: none;
      margin-bottom: 5px;
    }
  }
}
`
export const CardBack = styled.div `
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 5px;
  width: 100%;
  transform: rotateY(180deg);
  background-color: #CA001A;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  h3 {
    color: white;
    font-weight: bold;
  }

  button {
    width: 40%;
    height: 32px;
    background-color: #24B8BD;
    font-weight: bold;
    color: white;
    border: none;
  }
}
`