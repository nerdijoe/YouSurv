import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignOutRequest } from '../actions';

class NavbarMenu extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => {
    console.log('handleItemClick');
    // this.setState({ activeItem: name })
  }

  handleSignOut = () => this.props.userSignOutRequest();

  render() {
    const { activeItem } = this.state

    return (
      <Container>
        <Menu secondary>

          { this.props.is_authenticated ? (
            <Menu.Menu position='right'>
            <Link to='/'>
                <Menu.Item name='signOut' onClick={this.handleSignOut} />
              </Link>
          </Menu.Menu>

          ): (
            <Menu.Menu position='right'>
            <Link to='/signup'>
              <Menu.Item name='signUp' active={activeItem === 'signUp'} onClick={this.handleItemClick} />
            </Link>
            <Link to='/signin'>
              <Menu.Item name='signIn' active={activeItem === 'signIn'} onClick={this.handleItemClick} />
            </Link>
          </Menu.Menu>

          )}
          {/* <Menu.Menu position='right'>
            <Link to='/signup'>
              <Menu.Item name='signUp' active={activeItem === 'signUp'} onClick={this.handleItemClick} />
            </Link>
            <Link to='/signin'>
              <Menu.Item name='signIn' active={activeItem === 'signIn'} onClick={this.handleItemClick} />
            </Link>
          </Menu.Menu> */}

      </Menu>
      </Container>  
    );
  }
}

const mapStateToProps = state => {
  return {
    is_authenticated: state.UserReducer.is_authenticated,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    userSignOutRequest: () => { dispatch(userSignOutRequest()) },
  }
};

const connectedNavbarMenu = connect(mapStateToProps, mapDispatchToProps)(NavbarMenu);

export default connectedNavbarMenu;
