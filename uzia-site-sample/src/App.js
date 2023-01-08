import React, { Component } from 'react';
import {
  CustomNavbar as Navbar,
  CustomFooter as Footer,
  Home, About, Game, Contact
} from './components';
import AppContext from './AppContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ContentDatas from './static/Contents.json';
import NewsDatas from './static/News.json';

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

  getLocationPageName = () => {
    const pathName = window.location.pathname
  }

  get contextValue() {
    return {
      breakPoints: {
        xxl: 1400,
        xl: 1200,
        lg: 992,
        md: 768,
        sm: 576
      },
      constentDatas: ContentDatas.contents_data,
      newsDatas: NewsDatas.news_data,
      locationPathName: window.location.pathname,
      locationPageName: this.getLocationPageName()
    }
  }

  render() {
    console.log("App::this.contextValue -> ", this.contextValue)
    return (
      <AppContext.Provider value={this.contextValue}>
        <Navbar />
        <Router>
          <Route path={`${process.env.PUBLIC_URL}/`} exact>
            <Home />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/about`}>
            <About />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/contents`}>
            <Game />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/contact`}>
            <Contact />
          </Route>
        </Router>
        <Footer />
      </AppContext.Provider>
    );
  }
}

export default App;
