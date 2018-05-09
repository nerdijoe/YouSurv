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

// import LandingHeaderMenu from './LandingHeaderMenu';
import LogoThunder from '../assets/images/logo/logo_thunder_01.png';
import Logo01 from '../assets/images/logo/logo_01.png';
import Logo05 from '../assets/images/logo/logo_05.png';
import Menu from './NavbarMenu';

const styles = {
  header: {
    paddingTop: 20,
    // justifyContent: 'center',
    backgroundColor: 'white',
  },

};


class Navbar extends Component {
  render() {
    return (
      <Container style={styles.header}>
        <Grid columns='equal'>
          <Grid.Column width={4} align='left'>
            <Link to='/'>
              <Image src={Logo05} shape='rounded' size='small' />
            </Link>
          </Grid.Column>
          <Grid.Column>

          </Grid.Column>

          <Grid.Column>
            <Menu />
          </Grid.Column>
        </Grid>
      </Container>

    );
  }
}

export default Navbar;
