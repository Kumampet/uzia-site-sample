import React from 'react';
import classnames from 'classnames';
import { CardTile } from '../components';
import { Button, Card } from 'react-bootstrap';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import { replaceURLPublicPath } from '../common';

class HomeContentRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: props.title
    }
  }

  generateNewsCardItems = () => {
    const { contentItems, contentTypeKey } = this.props;
    const newItems = [];

    _forEach(contentItems, (item, index) => {
      const id = _get(item, 'id');
      const title = _get(item, "title");
      const summary = _get(item, "summary");
      const allVirePath = _get(this.props, "allViewPath");

      // CardTextは最大4行。超過した場合は...表記
      const newBody = (
        <Card.Body className="home-content-row-card-body">
          <Card.Title>{title}</Card.Title>
          <Card.Text className={classnames(`card-text-${index}`, `content-type-key-${contentTypeKey} line-clamp-4`)}>{summary}</Card.Text>
          <Button href={replaceURLPublicPath(`${allVirePath}/${id}`)}>くわしく</Button>
        </Card.Body>
      );
      item.content_body = newBody;

      newItems.push(item);
    });

    return newItems;
  }

  render() {
    const { displayType, contentTypeKey, allViewPath } = this.props;
    const { headerTitle } = this.state;
    return (
      <div className="home-contents-row">
        <h2 className="title-container d-flex align-items-center">
          {headerTitle}
          <Button size="sm" className="ms-3" variant="secondary" href={allViewPath}>すべて見る</Button>
        </h2>
        {displayType === 'card' && (
          <CardTile contentTypeKey={contentTypeKey} contentItems={this.generateNewsCardItems()} maxRow={1} />
        )}
      </div>
    );
  }
}

export default HomeContentRow;