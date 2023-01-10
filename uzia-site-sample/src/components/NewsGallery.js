import React from 'react';
import { ListGroup } from 'react-bootstrap';

class NewsGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <ListGroup>
          <ListGroup.Item action href="#link1">
            Link 1
          </ListGroup.Item>
          <ListGroup.Item action href="#link2" disabled>
            Link 2
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => {
            alert('You clicked the third ListGroupItem');
          }}>
            This one is a button
          </ListGroup.Item>
        </ListGroup>
      </React.Fragment>
    )
  }
}

export default NewsGallery;
