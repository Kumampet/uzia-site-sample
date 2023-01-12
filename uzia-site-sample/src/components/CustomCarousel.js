import React from 'react';
import { Carousel } from 'react-bootstrap';
import { replaceURLPublicPath } from '../common';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _includes from 'lodash/includes';

class CustomCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTheme: props.defaultTheme,
      items: props.items
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
      const perfectFilePath = replaceURLPublicPath(imageFileName);
      const alt = _get(item, "alt");
      const href = replaceURLPublicPath(_get(item, "href"));
      const caption = _get(item, "caption");
      const interval = _get(item, "interval");

      if (perfectFilePath) {
        const captionElement = caption ? (
          <Carousel.Caption>
            <h5>{caption.title}</h5>
            <p>{caption.text}</p>
          </Carousel.Caption>
        ) : null;
        renderItems.push(
          <Carousel.Item interval={interval}>
            {href ? (
              <a href={href}>
                <img className="d-block w-100" src={perfectFilePath} alt={alt} />
                {captionElement}
              </a>
            ) : (
              <React.Fragment>
                <img className="d-block w-100" src={perfectFilePath} alt={alt} />
                {captionElement}
              </React.Fragment>
            )}
          </Carousel.Item>
        );
      }
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