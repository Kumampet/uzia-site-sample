import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Row, Col, Card, Button } from 'react-bootstrap';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';
import AppContext from '../AppContext';


class CardTile extends React.Component {
  static contextType = AppContext;

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

  componentDidMount() {
    this._isMounted = true;
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const innerWidth = window.innerWidth;
    const breakPoints = this.context.breakPoints;
    let breakPoint;
    if (breakPoints.xxl <= innerWidth) {
      breakPoint = 'xxl';
    } else if (breakPoints.xl <= innerWidth && innerWidth < breakPoints.xxl) {
      breakPoint = 'xl';
    } else if (breakPoints.lg <= innerWidth && innerWidth < breakPoints.xl) {
      breakPoint = 'lg';
    } else if (breakPoints.md <= innerWidth && innerWidth < breakPoints.lg) {
      breakPoint = 'md';
    }else if (breakPoints.sm <= innerWidth && innerWidth < breakPoints.md) {
      breakPoint = 'sm';
    } else {
      breakPoint = 'xs';
    }
    this.setState({ breakPoint });
  }

  fetchCardTiles = () => {
    const createElements = (content) => {
      return (
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
    }

    const contentItems = this.state.contentItems;
    // if (_isEmpty(contentItems)) {
    //   return null;
    // }
    const cardItemElements = [];
    _forEach([1, 2, 3, 4, 5, 6, 7, 8], (contentItem, index) => {
      const breakPoint = this.state.breakPoint;
      console.log({breakPoint})
      if (this.state.maxRow) {
        // 表示する行数に制限がある場合
        let threshold = breakPoint === "sm" || breakPoint === "xs" ? this.state.xsThreshold : this.state.mdThreshold;
        const maxIndex = threshold * this.state.maxRow;
        if (index < maxIndex) {
          cardItemElements.push(createElements(contentItem));
        }
      }
    });

    console.log("elemtLength: ", cardItemElements.length)

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