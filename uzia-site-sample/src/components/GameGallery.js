import React from 'react';
import AppContext from '../AppContext';
import classnames from 'classnames';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import _get from 'lodash/get';
import _forEach from 'lodash/forEach';
import { replaceURLPublicPath } from '../common';
import { CardTile } from '../components';
import { Card, Button } from 'react-bootstrap';

// dayjsの日本語対応
dayjs.locale(ja);

class GameGallery extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      contentTypeKey: 'game'
    };
  }

  generateNewsCardItems = () => {
    const newItems = [];
    const contentItems = this.context.constentDatas.data;
    const { contentTypeKey } = this.state;

    _forEach(contentItems, (item, index) => {
      const id = _get(item, 'id');
      const title = _get(item, "title");
      const summary = _get(item, "summary");
      const updateDate = _get(item, "update_date");
      const allVirePath = _get(this.props, "allViewPath");

      // CardTextは最大4行。超過した場合は...表記
      const newBody = (
        <Card.Body className="home-content-row-card-body">
          <Card.Title>{title}</Card.Title>
          <Card.Text className={classnames(`card-text-${index}`, `content-type-key-${contentTypeKey} line-clamp-4`)}>{summary}</Card.Text>
          <div className="right-box">
            <div className="d-grid gap-2">
              <Button href={replaceURLPublicPath(`${allVirePath}/${id}`)}>くわしく</Button>
            </div>
            {updateDate && (
              <p className="update-date text-end">更新日時: {dayjs(updateDate).format('YYYY年MMMMD日')}</p>
            )}
          </div>

        </Card.Body>
      );
      item.content_body = newBody;

      newItems.push(item);
    });

    return newItems;
  }

  render() {
    const { contentTypeKey } = this.state;
    return (
      <React.Fragment>
        <div className="mt-5">
          <p>当サークルで作成したゲームコンテンツ一覧です。「くわしく」をタップするとそれぞれの詳細ページに飛びます。</p>
        </div>
        <CardTile
          contentTypeKey={contentTypeKey}
          contentItems={this.generateNewsCardItems()}
          lgThreshold={2}
          mdThreshold={2}
        />
      </React.Fragment>
    )
  }
}

export default GameGallery;
