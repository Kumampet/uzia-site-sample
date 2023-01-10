import React from 'react';
import { Carousel } from 'react-bootstrap';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';

class CustomCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTheme: props.defaultTheme,
      items: props.items,
      topCarouselImagePath: `${process.env.PUBLIC_URL}/img/top_carousel`
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.generateCarouselContents();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  generateCarouselContents = () => {
    const renderItems = [];
    const items = this.state.items;
    _forEach(items, (item) => {
      const imageFileName = _get(item, "img_file_name");
      const perfectFilePath = this.state.topCarouselImagePath + "/" + imageFileName;
      const alt = _get(item, "alt");
      const href = _get(item, "href");
      const caption = _get(item, "caption");
      const interval = _get(item, "interval");
      renderItems.push(
        <Carousel.Item interval={interval}>
          {imageFileName && href ? (
            <a href={href}>
              <img className="d-block w-100" src={perfectFilePath} alt={alt} />
            </a>
          ) : imageFileName && !href ? (
            <img className="d-block w-100" src={perfectFilePath} alt={alt} />
          ) : null}
          {caption ? (
            <Carousel.Caption>
              <h5>{caption.title}</h5>
              <p>{caption.text}</p>
            </Carousel.Caption>
          ) : null}
        </Carousel.Item>
      );
    })
    return renderItems;
  }

  render() {
    const { defaultTheme, theme } = this.state;
    return (
      <Carousel variant={theme || defaultTheme}>
        {this.generateCarouselContents()}
      </Carousel>
    );
  }
}

export default CustomCarousel;