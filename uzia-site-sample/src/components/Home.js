import React from 'react';
import { Container } from 'react-bootstrap';
import {
  HomeContentRow,
  CustomCarousel as Carousel
} from '../components';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import topCarouselInfo from '../static/topCarouselInfo.json';

class Home extends React.Component {
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
    console.log({ items })
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
          <HomeContentRow title="LATEST CONTENTS" contentType="card" contentItems={[]}/>
          <HomeContentRow title="LATEST NEWS"/>
        </Container>
      </React.Fragment>
    );
  }
}

export default Home;