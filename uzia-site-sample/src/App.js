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
    let basePath = process.env.PUBLIC_URL;
    if (process.env.NODE_ENV === 'production') {
      console.log("this production")
      basePath = process.env.PUBLIC_URL + "/uzia-site-sample"
    }
    console.log({basePath})
    return (
      <React.Fragment>
        <Navbar />
        <Router>
          <Route path={`${basePath}/`} exact>
            <Home/>
          </Route>
          <Route path={`${basePath}/about`}>
            <About/>
          </Route>
          <Route path={`${basePath}/game`}>
            <Game/>
          </Route>
        </Router>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
