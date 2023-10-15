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
const ExplainH3 = styled.h3`
    font-size: 45px;
    font-family: "godicM";
    display: flex;
    justify-content: center;
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
                    <ExplainH3>1</ExplainH3>
                </SlideContents>
                <SlideContents>
                    <ExplainH3>2</ExplainH3>
                </SlideContents>
                <SlideContents>
                    <ExplainH3>3</ExplainH3>
                </SlideContents>
            </Slider>
        </Outer>
    )
}

export default SliderContainer;