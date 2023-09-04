import * as React from 'react';
import './home-route.css';
import SessionStorageAPI from "../login/session";
import IfLogin from "./ifLogin";
import IfLogout from "./ifLogout";
import Link from "react-router-dom"
import useIntersectionObserver from './useIntersectionObserver';

export const HomeRoute: React.FC = () => {
    const targetRef = React.useRef(null);
    const [scrollY, setScrollY] = React.useState<number>(0);

    let whetherLoginComponent = <IfLogout></IfLogout>;

    const sessionStorage = new SessionStorageAPI();
    let nickName_ : string | null = sessionStorage.getItem("userNickname");

    if(sessionStorage.getItem("userToken") === null){
        whetherLoginComponent = <IfLogout></IfLogout>;
    }
    else{
        whetherLoginComponent = <IfLogin nickname={nickName_}></IfLogin>;
    }

    const opacityObj = {
        backgroundColor: `rgba(34, 40, 49, ${scrollY / 400})`
    };
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };
    

    window.addEventListener("scroll", handleScroll);

    // const title1 = () => {

    //     return (

    //     );
    // };
    // const text1 = () => {

    //     return (

    //     );
    // };
    // const title2 = () => {

    //     return (

    //     );
    // };
    // const text2 = () => {

    //     return (

    //     );
    // };
    // const title3 = () => {

    //     return (

    //     );
    // };
    // const text3 = () => {

    //     return (

    //     );
    // };
    // const btn1 = () => {

    //     return (

    //     );
    // };

    return(
        <body>
        <main className="index-main">
            <header ref={targetRef} className="index-header header-position" style={opacityObj}>
                <div className="header-container">
                    <div className="header__left">
                        <span className="font-hambak title">
                            TEXT ADVENTURE
                            <br />
                            PROJECT
                        </span>
                    </div>
                    <div className="header__right">
                        <div className="category__container">
                            <div className="category">
                                <a href="/">
                                    <span className="font-game-thick category-span">게임소개</span>
                                </a>
                            </div>

                            <div className="category">
                                <a href="/#/select">
                                    <span className="font-game-thick category-span">시작하기</span>
                                </a>
                            </div>

                            <div className="category">
                                <a href="">
                                    <span className="font-game-thick category-span">커뮤니티</span>
                                </a>
                            </div>

                            <div className="category">
                                <a href="">
                                    <span className="font-game-thick category-span">버그제보</span>
                                </a>
                            </div>
                        </div>
                        {whetherLoginComponent}
                    </div>
                </div>
            </header>
            <div className="first-section">
                <div>
                    <p className="intro font-game-thick">유저가 만들어가는 텍스트 어드벤쳐 게임</p>
                </div>
            </div>

            <div className="second-section"></div>

            <div className="third-section">
                <div className="third-section-line"></div>

                <div className="explain-game">
                    <div className="play-game-title-container">
                        <div className="title-line1"></div>
                        <h1 className="font-game-thick explain-game-title">
                            게임 소개
                        </h1>
                        <div className="title-line1"></div>
                    </div>

                    <div className="play-game-main-text">
                        <p className="explain-main-text description-size">
                            유저가 만들어가는 텍스트 어드벤쳐 게임은 '콘텐츠가 무한한 게임을 만들 수 있을까?' 라는 질문에서 출발한 프로젝트입니다.
                            <br/>
                            <br/>
                            게임이라는 분야는 게이머도 개발자만큼이나 게임에 대한 이해도가 높다는 특징이 있습니다. 그리하여 유저들이 모두 협업하여 발전시켜나갈 수 있는 게임을 개발해보려고 합니다.
                            <br/>
                            <br/>
                            궁극적으로 이 프로젝트는 게임이면서 동시에 게임 제작 툴을 개발하는 과정입니다.
                            <br/>
                        </p>
                    </div>
                    <button className="go-to-select-btn display-none" onClick={() => window.location.href = '/#/select'}>
                        <span className="font-game-thick">
                            게임 시작하기
                        </span>
                    </button>
                    

                    <div className="make-game-title-container">
                        <div className="title-line1"></div>
                        <h1 className="font-game-thick explain-game-title">
                            게임을 즐기는 방법
                        </h1>
                        <div className="title-line1"></div>
                    </div>

                    <div className="make-game-main-text">
                        <p className="explain-main-text description-size">
                            '메인스토리'란 게임의 장르를 결정하는 시작 이야기입니다.
                            <br/>
                            '에피소드'란 메인스토리에 맞추어 이후에 등장하게 되는 작은 사건들입니다. 
                            <br/>
                            <br/>
                            에피소드는 유저가 만들 수 있습니다.
                            <br/>
                            <br/>
                            
                        </p>

                    </div>

                </div>
                <div></div>
            </div>

            <div className="fourth-section">
                <div></div>
                <div className="block-chain-introduction">
                    <div className="block-chain-title-container">
                        <div className="title-line2"></div>
                        <h1 className="font-game-thick block-chain-title">
                            유저가 직접 컨텐츠를 추가해나가는
                            <br/>
                            텍스트 게임 개발 방법
                        </h1>
                        <div className="title-line2"></div>
                    </div>

                    <div className="block-chain-main-container">
                        <p className="block-chain-main-text description-size">
                            다음과 같은 분야에서 활용됩니다.
                        </p>
                    </div>
                </div>
                <div className="fourth-section-line"></div>
            </div>
        </main>
        <footer className="index-footer"></footer>
        <script src="/js/index.js"></script>
    </body>
    );
};