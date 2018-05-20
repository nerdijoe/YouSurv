import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Grid,
  Segment,
  Image,
  Button,
  Card,
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';

import BannerBusiness from '../assets/images/banner/banner_business_background.jpg';
import BannerIf from '../assets/images/banner/banner_if.png';


const styles = {
  containerMain: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#F0F0F0',
    // marginRight: 0,

  },
  container: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    // justifyContent: 'center',
  },
  buttonBanner: {
    marginLeft: 10,

  },
  centered: {
    margin: 'auto',
    flex: 1,

  },
  header: {
    paddingTop: 20,
    // justifyContent: 'center',
  },

};

const BannerWrapper = styled.div`
  width: 100%;
  ${'' /* background: #0099FF; */}
  ${'' /* padding: 10px; */}
  margin-top: 10px;
`;

const Banner = styled.div`
  margin: auto;
  padding-top: 50px;
  padding-bottom: 150px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  // border-top: 1px solid #0099FF;
  ${'' /* background: #e3eefc; */}
  background: #ffffff;
  background-repeat: no-repeat;
  background-image: url(${BannerIf});
  background-position: right center;
  background-size: contain;
`;

const BannerText = styled.div`
  ${'' /* margin: auto; */}
  font-size: 3em;
  text-align: left;
  margin-left: 10px;
  font-weight: 100;
  color: black;
  ${'' /* max-width: 700px; */}
  padding-top: 120px;
  padding-bottom: 20px;
`;

const BannerTextSub = styled.div`
  ${'' /* margin: auto; */}
  font-size: 150%;
  text-align: left;
  margin-left: 10px;
  font-weight: 100;
  color: #474747;
  max-width: 700px;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const InfoWrapper = styled.div`
margin: auto;
background: #0099FF;
flex: 1;
justifyContent: 'center';
`;


class LandingBanner extends Component {
  render() {
    return (
      <div>
        <BannerWrapper>
          <Banner>
            <Container>
              <BannerText>
              Create your survey
                <br/><br/><br/>
              with SurveyApe
              </BannerText>
              <BannerTextSub>
                The world's #1 survey software. 
                <br/><br/>
                16 million questions answered daily.
              </BannerTextSub>
              
              <Link to='/signup'>
              <Button color="youtube" size='huge' style={styles.buttonBanner}>
                Try SurveyApe Now
              </Button>
              </Link>

              {/* <Button primary basic size='huge' style={styles.buttonBanner}>
                Get Dropbox Basic
              </Button> */}
            </Container>
          </Banner>

        </BannerWrapper>
      </div>
    );
  }
}

export default LandingBanner;
