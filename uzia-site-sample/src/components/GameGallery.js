import React from 'react';
import AppContext from '../AppContext';
import { ListGroup, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

import _get from 'lodash/get';

import { Link } from 'react-router-dom';

// dayjsの日本語対応
dayjs.locale(ja);

class GameGallery extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  genearteNewsGallery = (items = []) => {
    return [...items].map(item => {
      const id = _get(item, 'id');
      const title = _get(item, 'title');
      const summary = _get(item, 'summary');
      const href = `${process.env.PUBLIC_URL}/news/${id}`;
      const updateDate = _get(item, 'update_date');
      return (
        <ListGroup.Item action href={href} className="news-list-group-contents">
          <h3>{title}</h3>
          {updateDate && (
            <span className="fs-6">更新日時: {dayjs(updateDate).format('YYYY年MMMMD日')}</span>
          )}
          <p className="text-truncate">{summary}</p>
        </ListGroup.Item>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>GameGallery 建設予定地</h1>
      </React.Fragment>
    )
  }
}

export default GameGallery;
