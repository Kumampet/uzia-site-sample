import React, { Component } from 'react';
import './stylesheet/App.css';
import {
  CustomNavbar as Navbar,
  CustomFooter as Footer,
  Home, About, Game
} from './components';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  
  render() {
    console.log(process.env)
    return (
      <React.Fragment>
        <Navbar />
        <Router>
          <Route path={`${process.env.PUBLIC_URL}/`} exact>
            <Home/>
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/about`}>
            <About/>
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/game`}>
            <Game/>
          </Route>
        </Router>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
