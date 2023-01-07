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
    return (
      <React.Fragment>
        <Navbar />
        <Router>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/about'>
            <About/>
          </Route>
          <Route path='/game'>
            <Game/>
          </Route>
        </Router>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
