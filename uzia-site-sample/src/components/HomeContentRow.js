import React from 'react';
import { CardTile } from '../components';
import { Row, Button } from 'react-bootstrap';

class HomeContentRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: props.title
    }
  }

  render() {
    const { contentItems, displayType, contentTypeKey } = this.props;
    const { headerTitle } = this.state;
    return (
      <React.Fragment>
        <h2 className="d-flex">
          {headerTitle}
          <Button className="ms-3" variant="secondary" href={`${process.env.PUBLIC_URL}/contents`}>すべて見る</Button>
        </h2>
        {displayType === 'card' && (
          <React.Fragment>
            <Row>
              <CardTile contentTypeKey={contentTypeKey} contentItems={contentItems} maxRow={1} />
            </Row>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default HomeContentRow;