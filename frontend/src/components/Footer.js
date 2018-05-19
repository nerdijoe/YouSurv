import React, { Component } from 'react';
import {
  Container,
  Grid,
  Segment,
  Image,
  Button,
  Card,
  Icon,
  Divider,
  Header,

} from 'semantic-ui-react';
import styled from 'styled-components';

// import appStore from '../assets/images/badges/app-store-badge.svg';
// import googlePlay from '../assets/images/badges/google-play-badge.png';

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 50px;
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

const AppStoreBadge = styled.div`
  width: 70%;
  height: auto;
`
const googlePlayBadge = styled.div`
  padding-top: 3px;
  width: 80%;
  height: auto;
`

class Footer extends Component {
  render() {
    return (
      <MyContainer>
        <Wrapper>
          {/* <Image src={appStore} styled={AppStoreBadge}/>
          
          <googlePlayBadge><Image src={googlePlay} /></googlePlayBadge> */}
          <Container textAlign='right'>
            <Header as='h5'>Copyright © 2018 SurveyApe. Made with ❤️by Team 8</Header>
          </Container>
        </Wrapper>
      </MyContainer>
    );
  }
}

export default Footer;
