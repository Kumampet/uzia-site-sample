import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Row, Col, Card, Button } from 'react-bootstrap';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';


class CardTile extends React.Component {
  static propTypes = {
    contentItems: PropTypes.array.isRequired
  }

  static defaultProps = {
    contentItems: []
  }

  constructor(props) {
    super(props);
    this.state = {
      contentItems: props.contentItems
    };
  }

  fetchCardTiles = () => {
    const contentItems = this.state.contentItems;
    if (_isEmpty(contentItems)) {
      return null;
    }
    const cardItemElements = [];
    _forEach([1,2,3,4], (contentItem) => {});

    return cardItemElements;
  }

  render() {
    const { items } = this.state;

    // if (_isEmpty(items)) return null;
    return (
      // <Row xs={1} md={2} className="g-4">
      //   {/* {this.fetchCardTiles()} */}
      // </Row>
      <div>aaaa</div>
    )
  }
}

export default CardTile;