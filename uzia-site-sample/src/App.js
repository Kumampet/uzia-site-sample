import React, { Component } from 'react';
import './stylesheet/App.css';
import {
  CustomNavbar as Navbar,
  CustomFooter as Footer,
  Home, About, Game
} from './components';
import AppContext from './AppContext';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.breakPoint = ""
  }

  componentDidMount() {
    this._isMountned = true;
  }

  componentWillUnmount() {
    this._isMountned = false;
  }

  render() {
    const contextValue = {
      breakPoints: {
        xxl: 1400,
        xl: 1200,
        lg: 992,
        md: 768,
        sm: 576
      }
    }
    return (
      <AppContext.Provider value={contextValue}>
        <Navbar />
        <Router>
          <Route path={`${process.env.PUBLIC_URL}/`} exact>
            <Home />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/about`}>
            <About />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/game`}>
            <Game />
          </Route>
        </Router>
        <Footer />
      </AppContext.Provider>
    );
  }
}

export default App;
