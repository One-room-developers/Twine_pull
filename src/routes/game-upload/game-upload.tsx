import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import { HeaderBar } from '../home';
import {useQuery} from "react-query";
import { getUploadedStoriesApi } from '../gameDataApi';
import apoImg from './img/mode-apo.png';

import {convertISOToKoreaDate} from '../board/components/postList/convertIsoToKoreaDate';


const Container = styled.body`
    margin-bottom: 50px;
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
const Main = styled.div`
    padding-top: 80px;
    max-width: 520px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;

`
const Loader = styled.h2`
    font-size: 28px;
    font-weight: 600;
`
const LinkContainer = styled.div`
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const LinkEmptyContainer = styled.div`
    width: 136px;
    display: flex;
    justify-content: flex-end;
`
const LinkEmptyButton = styled.div`
    color: var(--main-white);
    background-color: var(--main-blue);
    padding: 5px;
    border-radius: 3px;
    font-size: 16px;
`
const LinkButton = styled.div`
    color: var(--main-white);
    background-color: var(--main-blue);
    padding: 5px;
    border-radius: 3px;
    font-size: 15px;
    display: none;
`
const StoryEmpty = styled.li`
    width: 420px;
    height: 110px;
    margin-bottom: 5px;
    background-color:rgb(97, 106, 117);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 2px;
    `
const SubInfoContainer = styled.div`
    
`
const SubInfo = styled.h3`
    color: white;
    font-size: 14px;
`
const ImgContainer = styled.div`
    display: none;
    width: 140px;
    height: 100%;
`
const CateroryImg = styled.img`
    width: 120px;
    height: 120px;
    border: 1px solid var(--main-white);
`
const StoryTitle = styled.h2`
    font-size: 20px;
    color: var(--main-white);
    font-weight: 600;
    margin: 10px 0;
`
const StoryEmptyContent = styled.h3`
    color: var(--main-white);
    font-size: 16px;
`
const StoryContent = styled.h3`
    color: var(--main-white);
    font-size: 16px;
    display: none;
    max-width: 300px;
`
const StoryInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 130px;
    margin: 5px 10px 5px 0;
`
const StoryWrapper = styled.div`
    position: relative;
    width: 420px;
    height: 110px;
    margin-bottom: 5px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 8px 0px;
`
const Story = styled.li`
    position: absolute;
    width: 420px;
    height: 110px;
    background-color:rgb(97, 106, 117);
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 2px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    
    &:hover{
        height: 140px;
        width: 520px;
        top: -10px;
        bottom: -30px;
        left: -40px;
        right: -50px;
        justify-content: space-between;
        background-color: var(--main-dark);
        z-index: 10;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 8px 0px;
        align-items: flex-start;
        ${LinkButton}{
            display: block;
        }
        ${LinkContainer}{
            width: 350px;
        }
        ${StoryContent}{
            display: block;
        }
        ${ImgContainer}{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        ${StoryInfoContainer}{
            justify-content: space-between;
        }
    }
`

const StoryList = styled.ul`   
`

interface RouteParams{
    category: string,
    pageNum: string
}

//간추린 정보
interface IStory {
    pk: string,
    genre: number,
    level: number,
    name: string,
    userNickname: string,//누가 썼는가?
    startPassage: string,
    like: number,
    dislike: number,
    createdAt: Date,
}
//path="/game-upload/all/1"
export const GameUploadRoute: React.FC = () => {
    const { category } = useParams<RouteParams>();
    let categoryNum;
    //url에 오는 카테고리에 따라 DB로 들어가는 번호 달라지게 설정
    switch (category){
        case "all":
            categoryNum = 1;
            break;

        default:
            categoryNum = 1;
            break;
    }

    const { pageNum } = useParams<RouteParams>();


    //페이지 설정
    const [page, setPage] = React.useState(1);
    if(pageNum === undefined){
    }
    else if (parseInt(pageNum) !== page){
        setPage(parseInt(pageNum));
    }

    //Story data 가져오기
    const {isLoading:isStoryLoading, data:storiesData} = useQuery<IStory[]>(["storyList", page], ()=> getUploadedStoriesApi(categoryNum));//페이지 인자로 받아야됨

    
    //const {isLoading, data} = useQuery<IStory>("storyListData", fetchStoryList);

    return (
        <Container>
            <HeaderBar />
            <Header>
                <Title>게임 업로드 목록</Title>
            </Header>
            <Main>
                {isStoryLoading ? (<Loader>불러오는 중...</Loader>) : 
                //로딩아닌경우 나눔
                (storiesData?.length !== 0) ?
                (
                    <StoryList>
                        {storiesData?.map( (story, index) =>
                        <StoryWrapper key={index}>
                            <Story>
                                <ImgContainer>
                                    {story.genre === 1 ? (<CateroryImg src={apoImg} />):
                                    (<></>)}
                                </ImgContainer>
                                <StoryInfoContainer>
                                    <StoryTitle>{story.name}</StoryTitle>
                                    <StoryContent>업로드 일시: {convertISOToKoreaDate(story.createdAt)}</StoryContent>
                                    <LinkContainer>
                                        <SubInfoContainer>
                                            <SubInfo>작성자 {story.userNickname} | 추천수 {story.like - story.dislike} | 난이도 {story.level}</SubInfo>
                                        </SubInfoContainer>
                                        <LinkButton>
                                            <Link to={`/storyInfo/${story.pk}`}>
                                                자세히 &rarr;
                                            </Link>
                                        </LinkButton>
                                    </LinkContainer>
                                </StoryInfoContainer>
                            </Story>
                        </StoryWrapper>
                        )}
                    </StoryList>
                ) : (
                    <Loader>업로드된 에피소드가 없습니다.</Loader>
                )
                }
            </Main>
        </Container>
    );
};