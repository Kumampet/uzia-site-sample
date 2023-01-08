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
    contentItems: [],
    xsThreshold: 1,
    mdThreshold: 3
  }

  constructor(props) {
    super(props);
    this.state = {
      contentItems: props.contentItems,
      xsThreshold: props.xsThreshold,
      mdThreshold: props.mdThreshold,
      maxRow: props.maxRow
    };
  }

  fetchCardTiles = () => {
    const contentItems = this.state.contentItems;
    // if (_isEmpty(contentItems)) {
    //   return null;
    // }
    const cardItemElements = [];
    _forEach([1, 2, 3, 4, 5, 6, 7, 8], (contentItem) => {
      cardItemElements.push(
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )
    });

    return cardItemElements;
  }

  render() {
    const { items, xsThreshold, mdThreshold } = this.state;

    // if (_isEmpty(items)) return null;
    return (
      <Row xs={xsThreshold} md={mdThreshold} className="g-4">
        {this.fetchCardTiles()}
      </Row>
    )
  }
}

export default CardTile;