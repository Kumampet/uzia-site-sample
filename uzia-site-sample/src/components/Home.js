import React from 'react';
import AppContext from '../AppContext';
import { Container, Row, Col } from 'react-bootstrap';
import {
  HomeContentRow,
  TwitterEmbed,
  HomeContact,
  CustomCarousel as Carousel
} from '../components';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { replaceURLPublicPath } from '../common';
import topCarouselInfo from '../static/topCarouselInfo.json';

class Home extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchCarouselItems();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchCarouselItems = () => {
    const items = _get(topCarouselInfo, "top_carousel_data.contents", []);
    this.setState({ carouselItems: items });
  }

  render() {
    const { carouselItems } = this.state;
    return (
      <React.Fragment>
        {!_isEmpty(carouselItems) ? (
          <Carousel items={carouselItems} defaultTheme="dark" />
        ) : null}
        <Container>
          <div className="mt-5">
            <HomeContentRow
              allViewPath={replaceURLPublicPath(`/game`)}
              title="LATEST GAME"
              displayType="card"
              contentTypeKey="latest_conntents"
              contentItems={this.context.constentDatas.data}
            />
          </div>
          <div className="mt-5">
            <HomeContentRow
              allViewPath={replaceURLPublicPath(`/news`)}
              title="LATEST NEWS"
              displayType="card"
              contentTypeKey="latest_news"
              contentItems={this.context.newsDataItems}
            />
          </div>
          <div className="mt-5 home-info">
            <Row xs={1} sm={1} md={2}>
              <Col>
                <h2>Twitter</h2>
                <TwitterEmbed
                  height={700}
                  sourceType="url"
                  embedType="timeline"
                  lang="ja"
                  url={this.context.circleInfoData.sns.twitter.timeline_url}
                />
              </Col>
              <Col>
                <h2>Contact</h2>
                <HomeContact />
              </Col>
            </Row>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Home;