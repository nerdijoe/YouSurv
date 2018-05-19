import React, { Component } from 'react';
import { Container, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignOutRequest } from '../actions';

class NavbarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_token_exist: false,
    }
  }
  componentDidMount() {
    if(localStorage.getItem('token') != null) {
      console.log('NavbarMenu componentDidMount');
      this.setState({is_token_exist: true});
    }
  }

  state = { activeItem: '' }

  handleItemClick = (e, { name }) => {
    console.log('handleItemClick');
    // this.setState({ activeItem: name })
  }

  handleSignOut = () => this.props.userSignOutRequest();


  render() {
    const { activeItem } = this.state;
    const userEmail = localStorage.getItem('user_email');
    console.log('userEmail=', userEmail);
    return (
      <Container>
        <Menu secondary>

          { this.props.is_authenticated || this.state.is_token_exist? (
            <Menu.Menu position='right'>
              <Menu.Item>{userEmail}</Menu.Item>

              <Link to='/'>
                <Menu.Item onClick={this.handleSignOut} ><Icon name="sign out"/></Menu.Item>
              </Link>
          </Menu.Menu>

          ): (
            <Menu.Menu position='right'>
            <Link to={{pathname:'/signup', state:{ prevPath: window.location.pathname + window.location.search }}}>
              <Menu.Item name='signUp' active={activeItem === 'signUp'} onClick={this.handleItemClick} />
            </Link>
            <Link to={{pathname:'/signin', state:{ prevPath: window.location.pathname + window.location.search }}}>
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
