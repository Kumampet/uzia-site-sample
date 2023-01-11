import React from 'react';
import AppContext from '../AppContext';
import { ListGroup, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

import _get from 'lodash/get';

import { Link } from 'react-router-dom';

// dayjsの日本語対応
dayjs.locale(ja);

class NewsGallery extends React.Component {
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
          <div className="d-flex justify-content-between align-self-end">
            <div>
              <h3>{title}</h3>
              {updateDate && (
                <span className="fs-6">更新日時: {dayjs(updateDate).format('YYYY年MMMMD日')}</span>
              )}
              <p>{summary}</p>
            </div>
            <div className="ps-3 text-nowrap" style={{ placeSelf: "end" }}>
              <p>read more →</p>
            </div>
          </div>
        </ListGroup.Item>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <ListGroup>
          {this.genearteNewsGallery(this.context.newsDataItems)}
        </ListGroup>
      </React.Fragment>
    )
  }
}

export default NewsGallery;
