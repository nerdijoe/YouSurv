import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { userSignOutRequest } from '../actions';

import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import Navbar from './Navbar';

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  ${'' /* background: #0099FF; */}

`;
class Home extends Component {

  componentDidMount() {
    if(localStorage.getItem('token') == null) {
      this.props.history.push('/');
    }
  }


  handleSignOut = () => {
    console.log('Home handleSignOut');
    this.props.userSignOutRequest();
  }

  render() {
    return (
      <MyContainer>
        <Navbar />
        <h2>Home</h2>

        <Button onClick={this.handleSignOut}>Sign out</Button>



      </MyContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    is_authenticated: state.UserReducer.is_authenticated,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    userSignOutRequest: () => { dispatch(userSignOutRequest()); },
  }
}

const connectedHome = withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));

export default connectedHome;
