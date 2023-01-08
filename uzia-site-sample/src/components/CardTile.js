import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Row, Col, Card, Button } from 'react-bootstrap';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import AppContext from '../AppContext';

class CardTile extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    contentItems: PropTypes.array.isRequired
  }

  static defaultProps = {
    contentItems: [],
    xsThreshold: 1,
    mdThreshold: 3,
    lgThreshold: 4
  }

  constructor(props) {
    super(props);
    this.state = {
      contentItems: props.contentItems,
      xsThreshold: props.xsThreshold,
      mdThreshold: props.mdThreshold,
      lgThreshold: props.lgThreshold,
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
    console.log({innerWidth})
    if (breakPoints.xxl <= innerWidth) {
      breakPoint = 'xxl';
    } else if (breakPoints.xl <= innerWidth && innerWidth < breakPoints.xxl) {
      breakPoint = 'xl';
    } else if (breakPoints.lg <= innerWidth && innerWidth < breakPoints.xl) {
      breakPoint = 'lg';
    } else if (breakPoints.md <= innerWidth && innerWidth < breakPoints.lg) {
      breakPoint = 'md';
    } else if (breakPoints.sm <= innerWidth && innerWidth < breakPoints.md) {
      breakPoint = 'sm';
    } else {
      breakPoint = 'xs';
    }
    this.setState({ breakPoint });
  }

  fetchCardTiles = () => {
    const contentItems = this.state.contentItems;
    if (_isEmpty(contentItems)) {
      return null;
    }
    const cardItemElements = [];
    _forEach(contentItems, (contentItem, index) => {
      let threshold = this.state.lgThreshold;
      const breakPoint = this.state.breakPoint;
      const option = {
        flex: false
      };

      // 画面サイズがsm, csの場合は表示上限を変更し、カード内部の画像を横並びにする
      if (breakPoint === "sm" || breakPoint === "xs") {
        threshold = this.state.xsThreshold;
        option.flex = true;
      } else if (breakPoint === "md") {
        threshold = this.state.mdThreshold;
      }

      if (this.state.maxRow) {
        // 表示する行数に制限がある場合
        const maxIndex = threshold * this.state.maxRow;
        console.log({maxIndex})
        if (index < maxIndex) {
          cardItemElements.push(this.createCardElements(contentItem, option));
        }
      } else {
        cardItemElements.push(this.createCardElements(contentItem, option));
      }
    });

    return cardItemElements;
  }

  createCardElements = (content, option) => {
    const cardImg = _get(content, 'poster.card');
    const title = _get(content, 'title');
    const text = _get(content, 'text');
    const linkText = _get(content, 'link.text');
    const linkHref = _get(content, 'link.href');

    const cardBody = (
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {text && <Card.Text>{text}</Card.Text>}
        {linkText && linkText && <Button variant="primary" href={linkHref}>{linkText}</Button>}
      </Card.Body>
    )

    return (
      <Col>
        <Card>
          {option.flex ? (
            <Row>
              <Col>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + cardImg} />
              </Col>
              <Col>
                {cardBody}
              </Col>
            </Row>
          ) : (
            <React.Fragment>
              <Card.Img variant="top" src={process.env.PUBLIC_URL + cardImg} />
              {cardBody}
            </React.Fragment>
          )}
        </Card>
      </Col>
    )
  }

  render() {
    const { contentItems, xsThreshold, mdThreshold, lgThreshold } = this.state;
    if (_isEmpty(contentItems)) return null;

    return (
      <Row xs={xsThreshold} md={mdThreshold} lg={lgThreshold} className="g-4">
        {this.fetchCardTiles()}
      </Row>
    )
  }
}

export default CardTile;