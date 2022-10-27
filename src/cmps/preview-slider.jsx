import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default class LazyLoad extends Component {

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
      
        };

        const { imgs } = this.props

        return (
            <Slider {...settings} className="preview-slider">
                {imgs.map((img,idx) => {
                    return (
                        <div key={idx}>
                            <img  src={img} alt="Preview img" />
                        </div>
                    )
                })}
            </Slider>
        );
    }
}