import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PhotoGalery({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="h-[330px] sm:h-[430px] md:h-[530px] overflow-hidden">
      <Slider {...settings}>
        {images.map((url, index) => (
          <div key={index} className="h-[300px] sm:h-[400px] md:h-[500px]">
            <div
              className="h-full"
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
