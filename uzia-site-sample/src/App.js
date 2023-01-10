import React, { Component } from 'react';
import {
  CustomNavbar as Navbar,
  CustomFooter as Footer,
  Home, About, Game, Contact
} from './components';
import AppContext from './AppContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _forEach from 'lodash/forEach';

import NavmenuData from './static/Navmanu.json';
import ContentDatas from './static/Contents.json';
import NewsDatas from './static/News.json';
import DevelopMember from './static/DevelopMember.json';
import CircleInfoData from './static/CircleInfo.json';

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

  get contextValue() {
    return {
      breakPoints: {
        xxl: 1400,
        xl: 1200,
        lg: 992,
        md: 768,
        sm: 576
      },
      circleInfoData: CircleInfoData.circle_info_data,
      navMenuData: NavmenuData.nav_menu_data,
      constentDatas: ContentDatas.contents_data,
      newsDatas: NewsDatas.news_data,
      developMemberDatas: DevelopMember.develop_member_datas,
      locationPathName: window.location.pathname
    }
  }

  render() {
    console.log("App::this.contextValue -> ", this.contextValue)
    return (
      <AppContext.Provider value={this.contextValue}>
        <Navbar navMenuData={this.contextValue.navMenuData.data} />
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
