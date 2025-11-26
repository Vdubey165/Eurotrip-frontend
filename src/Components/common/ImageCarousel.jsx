// src/components/common/ImageCarousel.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../styles/ImageCarousel.css';

const ImageCarousel = ({ images, altText }) => {
  return (
    <div className="image-carousel-container">
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        useKeyboardArrows={true}
        autoPlay={false}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        dynamicHeight={false}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-image-wrapper">
            <img 
              src={image} 
              alt={`${altText} - View ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;