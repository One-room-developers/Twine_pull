import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css";

const Outer = styled.div`
    position: relative;
    width: 800px;
    height: 450px;
    background-color: #FFFFFF;
`
const SlideContents = styled.div`
    width: 800px;
    height: 450px;
`

function SliderContainer(){
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
    };

    return (
        <Outer>
            <Slider {...settings}>
                <SlideContents>
                    <h3>1</h3>
                </SlideContents>
                <SlideContents>
                    <h3>2</h3>
                </SlideContents>
                <SlideContents>
                    <h3>3</h3>
                </SlideContents>
            </Slider>
        </Outer>
    )
}

export default SliderContainer;