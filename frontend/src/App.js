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

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Verify from './components/Verify';
import Home from './components/Home';
import SurveyDetail from './components/surveys/SurveyDetail';

import SurveyRegister from './components/SurveyRegister';
import GeneralSurvey from './components/GeneralSurvey';
import SurveyMetric from './components/SurveyMetric';

import store from './store/manageStore'

const MyContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  ${'' /* background: #FAFAFA; */}
  
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
          <div>
          {/* <Navbar /> */}
         
          <MyContainer>
            
            <Route exact path='/' component={Landing} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/verify' component={Verify} />
            <Route path='/close/survey' component={GeneralSurvey} />
            <Route path='/surveyRegister' component={SurveyRegister} />
            <Route path='/home' component={Home} />
            <Route path='/surveyMetric' component={SurveyMetric}/>
            {/* <Route path='/surveydetail' component={SurveyDetail} /> */}

          </MyContainer>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
