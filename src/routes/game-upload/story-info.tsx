import * as React from 'react';
import styled from "styled-components";
import { HeaderBar } from '../home';
import {useParams} from 'react-router-dom';
import { useQuery } from 'react-query';
import {getUploadedPassagesApi, getStoryByPk} from '../gameDataApi';
import upChevron from './img/chevron-up.svg';
import downChevron from './img/chevron-down.svg';
import passageSvg from './img/app.svg';
import {OptionInfoRoute} from './option-info'
import likeSvg from './img/like.svg';

//recoil관련
import {useRecoilValue} from "recoil";
import {userIdAtom} from "../login/userInfoAtom";

//로그인 관련
import {checkAccessToken} from '../authApi';

const Container = styled.body`
    min-height: 100vh;
`
const Header = styled.div`
    width: 100%;
    height: 250px;
    background-color: var(--main-gray);
    display: flex;
    justify-content: center;
    align-items: flex-end;
`
const Title = styled.h1`
  color: var(--main-white);
  font-size: 55px;
  font-family: "gameBold";
  margin-bottom: 25px;
`;
const Loader = styled.h2`
    font-size: 28px;
    font-weight: 600;

`
const Main = styled.div`
    padding-top: 65px;
    max-width: 600px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;

`
const StoryInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const UpdownArea = styled.div`
    position: fixed;
    right : 54px;
    bottom: 54px;
    width: 48px;
    height: 122px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
const RemoteBtn = styled.div`
    width: 54px;
    height: 54px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 3px 6px rgba(0,0,0,0.5);
    &:hover{
        cursor: pointer;
    }
`
const BtnImg = styled.img`
    width: 32px;
    height: 32px;
`
const PassageList = styled.ul`
    width: 600px;
`
const PassageContainer = styled.li`
    width: 100%;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    
`
const PassageTitleContainer = styled.div`
    display: flex;
    width: 100%;
    box-shadow: 0 4px 2px -2px rgba(0,0,0,0.3);
    padding: 12px;
    align-items: center;
`
const PassageNum = styled.h3`
    font-family: "gameBold";
    font-size: 18px;
    margin-right: 5px;

`
const PassageTitle = styled.h2`
    font-family: "godicM";
    font-size: 20px;
    margin-right: 5px;

`
const PassageContext = styled.div`
    width: 100%;
    min-height: 150px;
    padding: 20px;
    font-family: "godicThin";
    font-size: 17px;

`
const PassageImg = styled.img`
    width: 18px;
    height: 18px;
    margin-right: 5px;
`
const OptionExpandBtn = styled.div`
    width: 600px;
    height: 32px;
    border: 1px solid rgba(0,0,0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-family: "godicThin";
    &:hover{
        cursor: pointer;
    }
`
const DownOptionImg = styled.img.attrs({src:downChevron})`
    width: 16px;
    height: 16px;
    margin-left: 8px;
`
const UpOptionImg = styled.img.attrs({src:upChevron})`
    width: 16px;
    height: 16px;
    margin-left: 8px;
`
const StoryTitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
`
const DeleteBtn = styled.div`
    color: #FF0060;
    background-color: var(--main-gray);
    padding: 10px;
    border-radius: 5px;
    font-family: "godicM";
    &:hover{
        cursor: pointer;
        background-color: #FF0060;
        color: var(--main-white);
    }
`
const StoryTitle = styled.h1`
    font-family: "godicM";
    font-size: 20px;
    font-weight: 600;
`
const StoryData = styled.h3`
    font-family: "godicThin";
    font-size: 17px;
`
const LikeBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 60px;
`
const LikeBtn = styled.div`
    width: 115px;
    height: 40px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    font-family: "gameBold";
    &:hover{
        background-color: var(--main-white);
        color: var(--main-gray);
        cursor: pointer;
    }
`
const DislikeBtn = styled(LikeBtn)`
    margin-left: 20px;
`
const LikeSvg = styled.img.attrs({src: likeSvg})`
    width: 16px;
    height: 16px;
    margin: 0 4px 0 2px;
`

function moveScrollTop (){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
function moveScrollBottom(){
    /*
    const element = document.getElementById("content");
    element.scrollIntoView();
    */
}
function convertISOToKoreaDate(iso){
    const isoDate = new Date(iso);
    const year = isoDate.getFullYear();
    const month = String(isoDate.getMonth() + 1).padStart(2, '0');
    const day = String(isoDate.getDate()).padStart(2, '0');
    const hours = String(isoDate.getHours()).padStart(2, '0');
    const minutes = String(isoDate.getMinutes()).padStart(2, '0');
    const seconds = String(isoDate.getSeconds()).padStart(2, '0');

    const koreanDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return koreanDate;
}

interface RouteParams{
    storyId: string
}

interface IStory {
    pk: string,
    genre: number,
    level: number,
    name: string,
    userNickname: string,//누가 썼는가?
    startPassage: string,
    like: number,
    dislike: number,
    lastUpdate: Date,
}

interface IPassage{
    pk: string,
    name: string,
    visibleText: string,
}
//path="/game-upload/storyInfo/:storyDbId"
export const StoryInfoRoute: React.FC = () => {
    const { storyId } = useParams<RouteParams>();
    //const {isLoading, data} = useQuery<Post>(["story", storyDbId], ()=> passage가져오는함수(parseInt(storyDbId)));

    const {isLoading:isStoryLoading, data:storyData} = useQuery<IStory>(["storyInfo", storyId], ()=> getStoryByPk(storyId));//페이지 인자로 받아야됨
    const {isLoading:isPassageLoading, data:passageData} = useQuery<IPassage[]>(["passageInfo", storyId], ()=> getUploadedPassagesApi(storyId));//페이지 인자로 받아야됨
    const [selectedPassage, setSelectedPassage] = React.useState(-1);

    //passage 갯수 알아와야 구현 가능한 여러개 펼치기
    //const isOptionExpand = [];

    //현재 사용자 정보
    const userId = useRecoilValue(userIdAtom);

    //추천시 로그인 검사하도록
    async function checkLogin() {
        if(await checkAccessToken(userId) === true){
            return true;
        }
        else{
            return false;
        }
    }

    //추천 버튼
    async function clickLikeBtn(){
        const isLogin = await checkLogin();

        if(isLogin === true){
            //postLike(userId);
        }
        else{
            alert("로그인이 필요합니다.");
        }
    }
    //비추천 기능
    async function clickDislikeBtn(){
        const isLogin = await checkLogin();

        if(isLogin === true){
            //postLike(userId);
        }
        else{
            alert("로그인이 필요합니다.");
        }
    }

    function openOption(index){
        setSelectedPassage(index);
    }
    function closeOption(){
        setSelectedPassage(-1);
    }

    return (
        <Container>
            <HeaderBar />
            <Header>
                <Title>에피소드 상세 정보</Title>
            </Header>
            <Main>
                {isStoryLoading ? (<Loader>불러오는 중...</Loader>) : 
                (
                    <StoryInfo>
                        <StoryTitleContainer>
                            <StoryTitle>에피소드명: {storyData.name}</StoryTitle>
                            <DeleteBtn>에피소드 삭제</DeleteBtn>
                        </StoryTitleContainer>
                        <StoryData>{storyData.userNickname} {convertISOToKoreaDate(storyData.lastUpdate)}</StoryData>
                        <LikeBtnContainer>
                            <LikeBtn onClick={clickLikeBtn}>
                                추천
                                <LikeSvg />
                                {storyData.like}
                            </LikeBtn>
                            <DislikeBtn onClick={clickDislikeBtn}>
                                아쉬워요
                                <LikeSvg />
                                {storyData.dislike}
                            </DislikeBtn>
                        </LikeBtnContainer>
                    </StoryInfo>
                )
                }
                {isPassageLoading ? (<Loader>불러오는 중...</Loader>) : 
                (
                    <PassageList>
                        {
                            (passageData?.length === 0) ? (<Loader>장면이 없습니다.</Loader>) :
                            (
                                passageData?.map((passage, index) =>
                                    <PassageContainer key={index}>
                                        <PassageTitleContainer>
                                            <PassageNum>장면 #{index} </PassageNum>
                                            <PassageTitle>{passage.name}</PassageTitle>
                                        </PassageTitleContainer>
                                        <PassageContext>{passage.visibleText}</PassageContext>
                                        {
                                            (selectedPassage === index) ? (
                                                <>
                                                    <OptionInfoRoute passageId={passage.pk}/>
                                                    <OptionExpandBtn onClick={()=>closeOption()}>선택지 접기<UpOptionImg/></OptionExpandBtn>
                                                </>
                                            ) : (<OptionExpandBtn onClick={()=>openOption(index)}>선택지 펼치기<DownOptionImg/></OptionExpandBtn>)
                                        }

                                    </PassageContainer>)
                            )
                        }
                    </PassageList>

                )
                }
            </Main>
                <UpdownArea>
                    <RemoteBtn onClick={moveScrollTop}>
                        <BtnImg src={upChevron}/>
                    </RemoteBtn>
                    <RemoteBtn onClick={moveScrollBottom}>
                        <BtnImg src={downChevron}/>
                    </RemoteBtn>
                </UpdownArea>
        </Container>
    );
};