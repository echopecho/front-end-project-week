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
  justify-content: space-between;

  h2 {
    margin: 0;
  }

  form input {
    padding-left: 5px;
  }

  div {
    width: 15%;
    background-color: #24B8BD;
    color: white;
    text-align: center;
    border: 1px solid black;
    margin-bottom: 5px;
    padding-top: 1px;
  }
`

export const ListContainer = styled.div `
  // display: flex;
  // flex-wrap: wrap;
  padding: 2%;
  position: relative;

  .item {
    position: absolute;
    width: 31%;
    max-width: 250px;
    height: 200px;
    margin: 5px;
    // box-shadow: 2px 2px 2px rgba(0,0,0,0.25);
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
      // background-color: transparent;
      // border: 1px solid black;
      perspective: 1000px;

      a {
        // width: 29%;
        // margin: 20px 2%;  
        text-decoration: none;
      }
       div {
        //  transition: transform 1s linear;
        //  transform-style: preserve-3d;
       }

      // &:hover div {
      //   transform: rotateY(180deg);
      // }
    }
  }
`
export const CardContainer = styled.div `
  border: 1px solid black;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  background-color: #fff;
  position: relative:
  transition: all .6s;
  transition: transform 1s linear;
  transform-style: preserve-3d;

  &.delete {
    transform: rotateY(180deg);
  }

  &.found {
    background-color: #24B8BD;
    transform: scale(1.05);
    box-shadow: 4px 4px 4px rgba(0,0,0,0.25);

    h3, .text-body {
      color: white;
    }
  }

  &.not-found {
    opacity: 0.4;
  }

  .card-front, .card-back {
    position: absolute;
    // overflow: hidden;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.25);
  }

  .card-front {

    .card-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid black;

      h3 {
        padding-bottom: 3px;
        // overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;  
      }
    }
  }
  
  h3, .text-body {
    color: black;
    margin: 0;
    // overflow-wrap: break-word;
  }

  a .text-body {
    padding-top: 3px;
    line-height: 1.25;
    // overflow: hidden;
    // text-wrap: wrap;
    height: 100px;
  }

  .card-back {
    transform: rotateY(180deg);
    background-color: red;
  }
`