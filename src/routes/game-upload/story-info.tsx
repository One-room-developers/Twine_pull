import * as React from 'react';
import styled from "styled-components";
import { HeaderBar } from '../home';
import {useParams} from 'react-router-dom';
import { useQuery } from 'react-query';
import {getUploadedPassagesApi, getStoryByPk} from '../gameDataApi';
import upChevron from './img/chevron-up.svg';
import downChevron from './img/chevron-down.svg';
import {OptionInfoRoute} from './option-info'


const Container = styled.body`
    height: 200vh;
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
    max-width: 500px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;

`
const StoryInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
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
    height: 58px;
    padding: 9px 10px 8px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover{
        background-color: rgb(202, 209, 217);
    }
`
const PassageTitleContainer = styled.div`
    
`
const PassangeNum = styled.h3`
`
const PassageTitle = styled.h2`
`
const PassageContext = styled.div`
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
interface IOption{

}

//path="/game-upload/storyInfo/:storyDbId"
export const StoryInfoRoute: React.FC = () => {
    const { storyId } = useParams<RouteParams>();
    //const {isLoading, data} = useQuery<Post>(["story", storyDbId], ()=> passage가져오는함수(parseInt(storyDbId)));

    const {isLoading:isStoryLoading, data:storyData} = useQuery<IStory>(["storyInfo", storyId], ()=> getStoryByPk(storyId));//페이지 인자로 받아야됨
    const {isLoading:isPassageLoading, data:passageData} = useQuery<IPassage[]>(["passageInfo", storyId], ()=> getUploadedPassagesApi(storyId));//페이지 인자로 받아야됨

    console.log("storyId: ", storyId);

    if (isStoryLoading){
        console.log("storyData: ", storyData);
    }
    if (isPassageLoading){
        console.log("passageData: ", passageData);
    }
    return (
        <Container>
            <HeaderBar />
            <Header>
                <Title>스토리 상세 정보</Title>
            </Header>
            <Main>
                {isStoryLoading ? (<Loader>불러오는 중...</Loader>) : 
                (
                    <StoryInfo>
                        스토리 정보 출력
                    </StoryInfo>
                )
                }
                {isPassageLoading ? (<Loader>불러오는 중...</Loader>) : 
                (
                    <PassageList>
                        {
                            (passageData?.length === 0) ? (<Loader>글상자가 없습니다.</Loader>) :
                            (
                                passageData?.map((passage, index) => 
                                    <PassageContainer key={index}>
                                        <PassageTitleContainer>
                                            <PassangeNum>#{index} </PassangeNum>
                                            <PassageTitle>{passage.name}</PassageTitle>
                                        </PassageTitleContainer>
                                        <PassageContext>{passage.visibleText}</PassageContext>
                                    </PassageContainer>)
                            )
                        }
                        {/*<OptionInfoRoute /> if로 출력여부 결정하게 하기.*/}
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