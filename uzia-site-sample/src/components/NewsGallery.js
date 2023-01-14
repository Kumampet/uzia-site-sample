import React from 'react';
import AppContext from '../AppContext';
import { ListGroup } from 'react-bootstrap';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import _get from 'lodash/get';
import { replaceURLPublicPath } from '../common';

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
      console.log({ item })
      const id = _get(item, 'id');
      const title = _get(item, 'title');
      const summary = _get(item, 'summary');
      const href = replaceURLPublicPath(`/news/${id}`);
      const updateDate = _get(item, 'update_date');
      return (
        <ListGroup.Item action href={href} className="news-list-group-contents">
          <div className="news-list-group-contents">
            <div className="news-list-group-body">
              <h3>{title}</h3>
              {updateDate && (
                <span className="fs-6">更新日時: {dayjs(updateDate).format('YYYY年MMMMD日')}</span>
              )}
              <p className="text-truncate">{summary}</p>
            </div>
            <div className="news-list-group-button">
              <i class="fa-solid fa-angles-right"></i>
            </div>
          </div>
        </ListGroup.Item>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="mt-5">
          <p>ゲームの更新情報、イベントへの出店情報など当サークルの最新情報を掲載しております。</p>
        </div>
        <ListGroup>
          {this.genearteNewsGallery(this.context.newsDataItems)}
        </ListGroup>
      </React.Fragment>
    )
  }
}

export default NewsGallery;
