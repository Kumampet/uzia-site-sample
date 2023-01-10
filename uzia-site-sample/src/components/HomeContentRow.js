import React from 'react';
import classnames from 'classnames';
import { CardTile } from '../components';
import { Row, Button, Card } from 'react-bootstrap';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';

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
      const newBody = (
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className={classnames(`card-text-${index}`, `content-type-key-${contentTypeKey}`)}>{summary}</Card.Text>
          <Button href={`${process.env.PUBLIC_URL}/news/${id}`}>くわしく</Button>
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
      <React.Fragment>
        <h2 className="d-flex">
          {headerTitle}
          <Button className="ms-3" variant="secondary" href={allViewPath}>すべて見る</Button>
        </h2>
        {displayType === 'card' && (
          <React.Fragment>
            <Row>
              <CardTile contentTypeKey={contentTypeKey} contentItems={this.generateNewsCardItems()} maxRow={1} />
            </Row>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default HomeContentRow;