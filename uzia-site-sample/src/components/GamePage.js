import React from 'react';
import AppContext from '../AppContext';
import { Container } from 'react-bootstrap';
import { NewsArticle } from '../components';
import * as GAMES from '../components/game/';
import _get from 'lodash/get';
import _find from 'lodash/find';

class GamePage extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'News',
    };
  }

  getNewsInfoFromId = (id) => {
    const newsDatas = this.context.constentDatas.data;
    if (!newsDatas.length) {
      return null;
    }
    const data = _find(newsDatas, { id });
    return data;
  }

  render() {
    const gameId = _get(this.props.match, "params.id");
    const gameData = this.getNewsInfoFromId(gameId);
    const componentName = gameData.key;
    return (
      <React.Fragment>
        {/* ゲームページ単独のコンポーネントを動的に描画できる */}
        {React.createElement(GAMES[componentName])}
      </React.Fragment>
    );
  }
}

export default GamePage;