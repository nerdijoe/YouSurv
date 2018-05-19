import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';

import Navbar from './Navbar';
import LandingBanner from './LandingBanner';
import Footer from './Footer';
import SurveyListOpenUnique from './surveys/SurveyListOpenUnique';

import '../style/youtube.css';

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  ${'' /* background: #0099FF; */}
  ${'' /* font-family: 'Roboto'; */}
`;

const Wrapper = styled.div`
  width: 100%;
  ${'' /* background: #0099FF; */}
  ${'' /* padding: 10px; */}
  margin-top: 10px;
  margin-left: 35px;
`;

class Landing extends Component {
  componentDidMount() {
    if(localStorage.getItem('token') != null) {
      this.props.history.push('/home');
    }
  }
  
  render() {
    return (
      <MyContainer>
        <Navbar />

        <Wrapper>
          {/* <h1>This is landing page!</h1> */}
          <LandingBanner />
          <SurveyListOpenUnique />
          
        </Wrapper>
        
        <Footer />

        {/* <Link to='/signup'>Sign up</Link>
        <Link to='/signin'>Sign in</Link> */}
      </MyContainer>
    );
  }
}

export default Landing;
