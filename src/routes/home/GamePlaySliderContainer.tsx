import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css";
import infoImg1 from './img/1_게임시작.png';
import infoImg2 from './img/2_플레이.png';
import infoImg3 from './img/3_게임진행.png';

const Outer = styled.div`
    position: relative;
    width: 900px;
    height: 460px;
    background-color: #FFFFFF;
`
const SlideContents = styled.div`
    width: 900px;
    height: 460px;
`
const ExplainImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

function GamePlaySliderContainer(){
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
                    <ExplainImg src={infoImg1} />
                </SlideContents>
                <SlideContents>
                    <ExplainImg src={infoImg2} />
                </SlideContents>
                <SlideContents>
                    <ExplainImg src={infoImg3} />
                </SlideContents>
            </Slider>
        </Outer>
    )
}

export default GamePlaySliderContainer;