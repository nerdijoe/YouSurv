import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import {
  Provider,
} from 'react-redux';


import {
  Container,
  Header,
} from 'semantic-ui-react';
import styled from 'styled-components';

// import logo from './logo.svg';
// import './App.css';
import './style/youtube.css';

import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';

import store from './store/manageStore'

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  ${'' /* background: #0099FF; */}
  
`;


class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>

      
      // </div>

      <Provider store={store}>
        <Router>
          
          <MyContainer>
          
            <Route exact path='/' component={Landing} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/home' component={Home} />
          </MyContainer>

        </Router>
      </Provider>

    );
  }
}

export default App;
