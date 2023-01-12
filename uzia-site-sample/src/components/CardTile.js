import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-bootstrap';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import AppContext from '../AppContext';
import { replaceURLPublicPath } from '../common';

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
    const breakPoint = this.context.getBreakPoint();
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

      // 画面サイズがsm, xsの場合は表示上限を変更し
      if (_breakPoint === "sm" || _breakPoint === "xs") {
        threshold = xsThreshold;
        if (_breakPoint === "sm") {
          //smの場合は要素を横並び
          option.flex = true;
        }
      } else if (_breakPoint === "md") {
        threshold = mdThreshold;
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
    const imgPath = replaceURLPublicPath(_get(content, 'poster.card'));
    const title = _get(content, 'title');
    const text = _get(content, 'text');
    const linkText = _get(content, 'link.text');
    const linkHref = replaceURLPublicPath(_get(content, 'link.href'));

    // itemに直接bodyエレメントがあればそちらを優先する
    const cardBody = _get(content, 'content_body') || (
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {text && <Card.Text className={classnames(`card-text-${option.index}`, `content-type-key-${option.contentTypeKey}`)}>{text}</Card.Text>}
        {linkText && linkHref && <Button variant="primary" href={linkHref}>{linkText}</Button>}
      </Card.Body>
    )

    return (
      <Col>
        <Card>
          {option.flex ? (
            <Row>
              {imgPath && (
                <Col>
                  <Card.Img variant="top" src={imgPath} />
                </Col>
              )}
              <Col>
                {cardBody}
              </Col>
            </Row>
          ) : (
            <React.Fragment>
              {imgPath && (
                <Col>
                  <Card.Img variant="top" src={imgPath} />
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
      <Row xs={xsThreshold} md={mdThreshold} lg={lgThreshold} className="gx-4 gy-1 justify-content-center">
        {this.fetchCardTiles()}
      </Row>
    )
  }
}

export default CardTile;