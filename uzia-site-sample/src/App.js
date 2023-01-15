import React, { Component } from 'react';
import {
  CustomNavbar as Navbar,
  CustomFooter as Footer,
  Home, About, Game, Contact, News, NewsPage, _404
} from './components';
import AppContext from './AppContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavmenuData from './static/Navmenu.json';
import GameDatas from './static/Games.json';
import NewsDatas from './static/News.json';
import DevelopMember from './static/DevelopMember.json';
import CircleInfoData from './static/CircleInfo.json';

import _get from 'lodash/get';
import _merge from 'lodash/merge';
import _forEach from 'lodash/forEach';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakPoints: {
        xxl: 1400,
        xl: 1200,
        lg: 992,
        md: 768,
        sm: 576
      }
    }
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.breakPoint = this.getWindowBreakPoint();
    this.rootElement = document.getElementById('root');
  }

  componentDidMount() {
    this._isMountned = true;
    this.setAttributeRootElement();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this._isMountned = false;
    window.removeEventListener('resize', this.handleResize);
  }

  // ウィンドウサイズが変わったときに逐次呼び出される
  handleResize = () => {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.breakPoint = this.getWindowBreakPoint();
    this.setAttributeRootElement();
  }

  // Windowのブレイクポイントを取得する
  getWindowBreakPoint = () => {
    const innerWidth = this.windowWidth;
    const breakPoints = this.state.breakPoints;
    let breakPoint;

    if (breakPoints.xxl <= innerWidth) {
      breakPoint = 'xxl';
    } else if (breakPoints.xl <= innerWidth && innerWidth < breakPoints.xxl) {
      breakPoint = 'xl';
    } else if (breakPoints.lg <= innerWidth && innerWidth < breakPoints.xl) {
      breakPoint = 'lg';
    } else if (breakPoints.md <= innerWidth && innerWidth < breakPoints.lg) {
      breakPoint = 'md';
    } else if (breakPoints.sm <= innerWidth && innerWidth < breakPoints.md) {
      breakPoint = 'sm';
    } else {
      breakPoint = 'xs';
    }
    return breakPoint;
  }

  // root elementに属性を追加する
  setAttributeRootElement = (attributes = {}) => {
    const defaultAttributes = {
      breakPoint: this.breakPoint
    }
    const newAttributes = _merge(defaultAttributes, attributes);

    _forEach(newAttributes, (value, key) => {
      this.rootElement.setAttribute(key, value);
    });
  }

  // JSONデータの並べ替え。デフォルトは日付の新しい順(降順) 
  sortJsonDataFromDate = (data, sort = "desc") => {
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
    } catch (e) {
      console.log(e)
    }
  }

  get contextValue() {
    return {
      breakPoints: this.state.breakPoints,
      getBreakPoint: this.getWindowBreakPoint,
      circleInfoData: CircleInfoData.circle_info_data,
      navMenuData: NavmenuData.nav_menu_data,
      constentDatas: GameDatas.contents_data,
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
        <Navbar flex={true} fixed="top" sticky="top" navMenuData={this.contextValue.navMenuData.data} />
        <Router>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
            <Route exact path={`${process.env.PUBLIC_URL}/news`} component={News} />
            <Route path={`${process.env.PUBLIC_URL}/news/:id`} component={NewsPage} />
            <Route exact path={`${process.env.PUBLIC_URL}/game`} component={Game} />
            <Route exact path={`${process.env.PUBLIC_URL}/contact`} component={Contact} />
            <Route component={_404} />
          </Switch>
        </Router>
        <Footer />
      </AppContext.Provider>
    );
  }
}

export default App;
