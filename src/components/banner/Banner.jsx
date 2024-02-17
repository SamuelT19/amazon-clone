import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './banner.module.css'
import { images } from "./carouselImage";

function Banner() {
  return (
    
    <>
      <div className={classes.banner_container}>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showIndicators={false}
          showThumbs={false}
          interval={2000}
        >
          {images.map((i) => {
            return <img src={i} alt="" key={i}/>;
          })}
              </Carousel>
              <div className={classes.gradient}></div>
      </div>
        
      </>
    
  );
}

export default Banner;
