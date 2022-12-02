import * as React from 'react';
import './home-route.css';
import useIntersectionObserver from './useIntersectionObserver';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const HomeRoute: React.FC = () => {

    const targetRef = React.useRef(null);
    const [scrollY, setScrollY] = React.useState<number>(0);

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
                                <a href="">
                                    <span className="font-game-thick category-span">게임소개</span>
                                </a>
                            </div>

                            <div className="category">
                                <a href="/select">
                                    <span className="font-game-thick category-span">가이드</span>
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
                        <div className="btn__container">
                            <div className="font-hambak login-btn">LOGIN</div>
                            <div className="font-hambak sign-btn">SIGN UP</div>
                        </div>
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
                            유저가 만들어가는 텍스트 어드벤쳐 게임은
                            <br/>
                            '콘텐츠가 무한한 게임을 만들 수 있을까?' 라는 질문에서 출발한 프로젝트입니다.
                            <br/>
                            <br/>
                            게임이라는 분야는 개발자뿐만 아니라 유저가 정답을 알고 있기도 한 분야입니다.
                            <br/>
                            <br/>
                            이 프로젝트는 게임이면서 동시에 게임 제작 툴을 개발하는 프로젝트입니다.
                            <br/>
                        </p>
                    </div>
                    <div className="empty">
                        <button className="go-to-select-btn display-none" onClick={() => window.location.href = '/#/select'}>
                            <span className="font-game-thick">
                                게임 시작하기
                            </span>
                        </button>
                    </div>

                    <div className="make-game-title-container">
                        <div className="title-line1"></div>
                        <h1 className="font-game-thick explain-game-title">
                            게임 속 스토리 제작하기
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
                            이렇게 유저가 만든 에피소드는 개발자가 소유하는 것이 아닌, 블록체인을 통해 유저의 소유권을 보장해줍니다.
                            <br/>
                            <br/>
                            <br/>
                        </p>
                        <a href="">
                            <div className="">
                                <span>
                                    블록체인 기술을 활용한 유저의 권리보호는 어떻게 이루어지나요?
                                </span>
                            </div>
                        </a>
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
                            블록체인 기술을 활용한
                            <br/>
                            유저의 권리 보호
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