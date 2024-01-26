import React, { useState, useEffect } from "react";
import Carousel from "@/components/CustomCarousel";
import _get from "lodash/get";
import _forEach from "lodash/forEach";
import _isEmpty from "lodash/isEmpty";

export default function Home() {
  const [carouselItems, setCarouselImages] = useState([]);

  useEffect(() => {
    fetch("/api/fetchTopCarouselImagesApi")
      .then((res) => {
        return res.json()
      })
      .then(result => {
        let images = [];
        const imageArray = _get(result, "imageArray");
        _forEach(imageArray, (item) => {
          images.push(_get(item, "path"));
        });
        setCarouselImages(images);
      })
  }, []);

  
  if (_isEmpty(carouselItems)) return null;
  
  console.log({carouselItems})
  return (
    <React.Fragment>
      <Carousel items={carouselItems} defaultTheme="dark" />
    </React.Fragment>
  );
}
