import React from 'react';
import classnames from 'classnames';
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
      contentTypeKey: props.contentTypeKey,
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
    console.log({ innerWidth })
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
    const { contentTypeKey, contentItems, xsThreshold, mdThreshold, lgThreshold, breakPoint, maxRow } = this.state;
    if (_isEmpty(contentItems)) {
      console.log("Card Tile null")
      return null;
    }
    const cardItemElements = [];
    _forEach(contentItems, (contentItem, index) => {
      let threshold = lgThreshold;
      const _breakPoint = breakPoint;
      const defaultFlex = _get(contentItem, "option.flex")
      const option = {
        contentTypeKey: contentTypeKey,
        index: index,
        flex: defaultFlex || false
      };

      // 画面サイズがsm, csの場合は表示上限を変更し、カード内部の画像を横並びにする
      if (_breakPoint === "sm") {
        threshold = xsThreshold;
        option.flex = true;
      } else if (_breakPoint === "md") {
        threshold = mdThreshold;
      } else if (_breakPoint === "xs") {
        option.flex = false;
      }


      // 表示項目の初期化
      if (maxRow) {
        // 表示する行数に制限がある場合
        const maxIndex = threshold * maxRow;
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

    const cardBody = _get(content, 'content_body') || (
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {text && <Card.Text className={classnames(`card-text-${option.index}`, `content-type-key-${option.contentTypeKey}`)}>{text}</Card.Text>}
        {linkText && linkText && <Button variant="primary" href={linkHref}>{linkText}</Button>}
      </Card.Body>
    )

    return (
      <Col>
        <Card>
          {option.flex ? (
            <Row>
              {cardImg && (
                <Col>
                  <Card.Img variant="top" src={process.env.PUBLIC_URL + cardImg} />
                </Col>
              )}
              <Col>
                {cardBody}
              </Col>
            </Row>
          ) : (
            <React.Fragment>
              {cardImg && (
                <Col>
                  <Card.Img variant="top" src={process.env.PUBLIC_URL + cardImg} />
                </Col>
              )}
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
      <Row xs={xsThreshold} md={mdThreshold} lg={lgThreshold} className="gx-4 gy-1">
        {this.fetchCardTiles()}
      </Row>
    )
  }
}

export default CardTile;