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
    min-height: 58px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    
`
const PassageTitleContainer = styled.div`
    display: flex;
    width: 100%;
    box-shadow: 0 4px 2px -2px rgba(0,0,0,0.3);
    padding: 12px;

`
const PassageNum = styled.h3`
    font-family: "gameBold";
    font-size: 18px;
    margin-right: 5px;

`
const PassageTitle = styled.h2`
    font-family: "godicM";
    font-size: 18px;
    margin-right: 5px;

`
const PassageContext = styled.div`
    width: 100%;
    min-height: 200px;
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
//path="/game-upload/storyInfo/:storyDbId"
export const StoryInfoRoute: React.FC = () => {
    const { storyId } = useParams<RouteParams>();
    //const {isLoading, data} = useQuery<Post>(["story", storyDbId], ()=> passage가져오는함수(parseInt(storyDbId)));

    const {isLoading:isStoryLoading, data:storyData} = useQuery<IStory>(["storyInfo", storyId], ()=> getStoryByPk(storyId));//페이지 인자로 받아야됨
    const {isLoading:isPassageLoading, data:passageData} = useQuery<IPassage[]>(["passageInfo", storyId], ()=> getUploadedPassagesApi(storyId));//페이지 인자로 받아야됨
    const [selectedPassage, setSelectedPassage] = React.useState(-1);

    //passage 갯수 알아와야 구현 가능한 여러개 펼치기
    //const isOptionExpand = [];

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
                                            <PassageImg src={passageSvg}/>
                                            <PassageNum>#{index} </PassageNum>
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