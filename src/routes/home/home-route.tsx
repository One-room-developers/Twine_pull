import * as React from 'react';
import './home-route.css';
import CookieStorageAPI from "../login/cookies";
import IfLogin from "./ifLogin";
import IfLogout from "./ifLogout";
import {Link, useHistory} from "react-router-dom"
import GamePlaySliderContainer from './GamePlaySliderContainer';
import MakeEpiSliderContainer from './MakeEpiSliderContainer';
import {checkAccessToken} from '../authApi';
import {useRecoilValue, useRecoilState} from "recoil";
import {userNameAtom, userIdAtom} from "../login/userInfoAtom";

export async function isLogin(userId: string | null) : Promise<React.JSX.Element>{
    if(userId === ""){
        console.log("저장된 유저 id 없음");
        return(<IfLogout></IfLogout>);
    }
    else{
        console.log("저장된 유저 id 있음");
        return(<IfLogin></IfLogin>);
    }
}

export const HeaderBar: React.FC = () =>{
    const history = useHistory();
    const targetRef = React.useRef(null);
    const [scrollY, setScrollY] = React.useState<number>(0);

    const [whetherLoginComponent, setWhetherLoginComponent] = React.useState(<IfLogout></IfLogout>);
    const userId = useRecoilValue(userIdAtom);

    React.useEffect(() => {
        async function getWhetherLoginComponent(){
            
            setWhetherLoginComponent(await isLogin(userId));
        };
        getWhetherLoginComponent()
    }, []);

    const opacityObj = {
        backgroundColor: `rgba(34, 40, 49, ${scrollY / 300})`
    };
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    async function toGameTutorial(){
        await history.push("/");
        window.scrollTo({
            top: 1348,
            behavior: 'smooth'
        })
    }
    
    //recoil

    window.addEventListener("scroll", handleScroll);

    return(
        <header ref={targetRef} className="index-header header-position" style={opacityObj}>
                <div className="header-container">
                    <div className="header__left">
                        <Link to={"/"}>
                            <span className="font-hambak title">
                                TEXT ADVENTURE
                                <br />
                                PROJECT
                            </span>
                        </Link>
                    </div>
                    <div className="header__right">
                        <div className="category__container">
                            <div onClick={toGameTutorial} className="category">
                                <span className="cursor font-game-thick category-span">게임소개</span>
                            </div>

                            <div className="category">
                                <Link to={`/select`}>
                                    <span className="font-game-thick category-span">게임시작</span>
                                </Link>
                            </div>

                            <div className="category">
                                <Link to={`/board/all`}>
                                    <span className="font-game-thick category-span">커뮤니티</span>
                                </Link>
                            </div>

                            <div className="category">
                                <Link to={`/board/bugReport/1`}>
                                    <span className="font-game-thick category-span">버그제보</span>
                                </Link>
                            </div>
                        </div>
                        {whetherLoginComponent}
                    </div>
                </div>
            </header>
    );
};

export const HomeRoute: React.FC = () => {
    
    return(
        <body>
        <main className="index-main">
            <HeaderBar />
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
                            유저가 만들어가는 텍스트 어드벤쳐 게임은 '콘텐츠의 생산이 소비보다 빠른 게임을 만들 수 있을까?' 라는 질문에서 출발한 프로젝트입니다.
                            <br/>
                            <br/>
                            게임이라는 분야는 게이머도 개발자만큼이나 게임에 대한 이해도가 높다는 특징이 있습니다. 그리하여 유저들이 모두 협업하여 발전시켜나갈 수 있는 게임을 개발해보려고 합니다.
                            <br/>
                            <br/>
                            궁극적으로 이 프로젝트는 게임이면서 동시에 게임 제작 툴을 개발하는 과정입니다.
                            <br/>
                        </p>
                    </div>
                    {/* <button className="go-to-select-btn display-none" onClick={() => window.location.href = '/#/select'}>
                        <span className="font-game-thick">
                            게임 시작하기
                        </span>
                    </button>
                     */}
                    <br/>
                    <br/>

                    <div className="game-term-title-container">
                        <div className="title-line1"></div>
                        <h1 className="font-game-thick explain-game-title">
                            게임 속 용어
                        </h1>
                        <div className="title-line1"></div>
                    </div>

                    <div className="game-term-main-text">
                        <p className="explain-main-text description-size">
                            '메인 스토리'란 게임의 장르를 결정하는 시작 이야기입니다.
                            <br/>
                            '에피소드'란 메인스토리에 맞추어 이후에 등장하게 되는 작은 사건들입니다. 
                            <br/>
                            <br/>
                            이 게임은 옴니버스식으로 구성되어 있습니다. 고정적인 '메인 스토리'에 유저들이 유동적인 '에피소드'를 덧붙혀나가는 구조입니다.
                            <br/>
                            <br/>
                            이후로는 위 용어들을 사용하여 게임을 소개하겠습니다.
                        </p>

                    </div>

                </div>
                <div></div>
            </div>

            <div className="fourth-section">
                <div></div>
                <div className="game-play-introduction">
                    <div className="game-play-title-container">
                        <div className="title-line2"></div>
                        <h1 className="font-game-thick game-play-title">
                            게임 플레이 튜토리얼
                        </h1>
                        <div className="title-line2"></div>
                    </div>

                    <div className="game-play-main-container">
                        <GamePlaySliderContainer />
                    </div>

                    <div className="game-play-title-container">
                        <div className="title-line2"></div>
                        <h1 className="font-game-thick game-play-title">
                            에피소드 제작 튜토리얼
                        </h1>
                        <div className="title-line2"></div>
                    </div>

                    <div className="game-play-main-container">
                        <MakeEpiSliderContainer />
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