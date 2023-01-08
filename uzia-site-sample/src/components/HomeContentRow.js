import React from 'react';
import { CardTile } from '../components';
import { Row, Col, Button } from 'react-bootstrap';

class HomeContentRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: props.title
    }
  }

  render() {
    const { contentItems, contentType } = this.props;
    const { headerTitle } = this.state;
    return (
      <div className="mt-5">
        <h2 className="d-flex">
          {headerTitle}
          <Button className="ms-3" variant="secondary" href={`${process.env.PUBLIC_URL}/contents`}>すべて見る</Button>
        </h2>
        {contentType === 'card' && (
          <React.Fragment>
            <Row>
              <CardTile contentItems={contentItems} maxRow={1} />
            </Row>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default HomeContentRow;