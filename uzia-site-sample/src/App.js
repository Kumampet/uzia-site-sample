import React, { Component } from 'react';
import {
  CustomNavbar as Navbar,
  CustomFooter as Footer,
  Home, About, Game, Contact, News
} from './components';
import AppContext from './AppContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavmenuData from './static/Navmanu.json';
import ContentDatas from './static/Contents.json';
import NewsDatas from './static/News.json';
import DevelopMember from './static/DevelopMember.json';
import CircleInfoData from './static/CircleInfo.json';

import _get from 'lodash/get';


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

  // JSONデータの並べ替え。デフォルトは日付の新しい順(降順) 
  sortJsonDataFromDate = (data, sort="desc") => {
    try {
      if (!Array.isArray(data)) {
        throw new Error("入力されたデータが配列ではありませんでした。配列を期待しています。");    
      }
      if (sort === "desc") {
        return [...data].sort((a, b) => {
          if (!_get(b, "update_date") || !_get(a, "update_date")) {
            throw new Error("update_dateがありません。", a, b);
          }
          return new Date(b.update_date) - new Date(a.update_date);
        });
      } else {
        return [...data].sort((a, b) => {
          if (!_get(b, "update_date") || !_get(a, "update_date")) {
            throw new Error("update_dateがありません。", a, b);
          }
          return new Date(b) - new Date(a);
        });
      }
    } catch(e) {
      console.log(e)
    }
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
      newsData: NewsDatas.news_data,
      newsDataItems: this.sortJsonDataFromDate(NewsDatas.news_data.data),
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
          <Route path={`${process.env.PUBLIC_URL}/news`}>
            <News />
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
