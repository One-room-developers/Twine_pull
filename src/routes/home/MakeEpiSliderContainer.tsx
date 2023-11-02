import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css";
import infoImg1 from './img/1_에피소드생성.png';
import infoImg2 from './img/2_장면생성.png';
import infoImg3 from './img/3_장면생성2.png';
import infoImg4 from './img/4_선택지생성.png';
import infoImg5 from './img/5_장면완성.png';
import infoImg6 from './img/6_다음장면만들기.png';
import infoImg7 from './img/7_에피소드업로드.png';
import infoImg8 from './img/8_저장확인.png';


const Outer = styled.div`
    position: relative;
    width: 900px;
    height: 460px;
    background-color: #FFFFFF;
`
const SlideContents = styled.div`
    width: 900px;
    height: 460px;
    border: 1px solid #FFFFFF;
`
const ExplainImg = styled.img`
    width: 100%;
    height: 100%;
`

function MakeEpiSliderContainer(){
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
                <SlideContents>
                    <ExplainImg src={infoImg4} />
                </SlideContents>
                <SlideContents>
                    <ExplainImg src={infoImg5} />
                </SlideContents>
                <SlideContents>
                    <ExplainImg src={infoImg6} />
                </SlideContents>
                <SlideContents>
                    <ExplainImg src={infoImg7} />
                </SlideContents>
                <SlideContents>
                    <ExplainImg src={infoImg8} />
                </SlideContents>
            </Slider>
        </Outer>
    )
}

export default MakeEpiSliderContainer;