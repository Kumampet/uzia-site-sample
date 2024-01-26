import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
// import { replaceURLPublicPath } from '../common';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _map from 'lodash/map';

const GenerateCarouselContents = (props) => {
  const renderItems = [];
  const { items } = props;
  _forEach(items, (item) => {
    console.log({ item })
    renderItems.push(
      <Carousel.Item>
        <img className="d-block w-100" src={item} />
      </Carousel.Item>
    )
  });
  return renderItems;
  // _forEach(items, (item) => {
  //   const imageFileName = _get(item, "img_file_name");
  //   // const perfectFilePath = replaceURLPublicPath(imageFileName);
  //   const alt = _get(item, "alt");
  //   const href = replaceURLPublicPath(_get(item, "href"));
  //   // const caption = _get(item, "caption");
  //   const interval = _get(item, "interval", null);

  //   // if (perfectFilePath) {
  //     // const captionElement = caption ? (
  //     //   <Carousel.Caption>
  //     //     <h5>{caption.title}</h5>
  //     //     <p>{caption.text}</p>
  //     //   </Carousel.Caption>
  //     // ) : null;
  //     // renderItems.push(
  //     //   <Carousel.Item interval={interval}>
  //     //     {href ? (
  //     //       <a href={href}>
  //     //         <img className="d-block w-100" src={imageFileName} alt={alt} />
  //     //         {/* {captionElement} */}
  //     //       </a>
  //     //     ) : (
  //     //       <React.Fragment>
  //     //         <img className="d-block w-100" src={imageFileName} alt={alt} />
  //     //         {/* {captionElement} */}
  //     //       </React.Fragment>
  //     //     )}
  //     //   </Carousel.Item>
  //     // );
  //   // }
  // })
  // return renderItems;
}

export default function CustomCarousel(props) {
  const { items, defaultTheme } = props;
  const [theme, setTheme] = useState(null);

  return (
    <Carousel fade variant={theme || defaultTheme}>
      {/* <GenerateCarouselContents items={items} /> */}
      {_map(items, (item) => {
        return (
          <Carousel.Item>
            <img className="d-block w-100" src={item} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
