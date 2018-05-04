import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';



const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  ${'' /* background: #0099FF; */}

`;

class Landing extends Component {

  render() {
    return (
      <MyContainer>
        <h1>This is landing!</h1>

        <Link to='/signup'>Sign up</Link>
      </MyContainer>
    );
  }
}

export default Landing;
