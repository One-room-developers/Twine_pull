import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { HeaderBar } from '../home';
import {useQuery} from "react-query";
import { fetchStoryList } from './api';
import apoImg from './img/mode-apo.png';


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
    font-size: 13px;
`
const ImgContainer = styled.div`
    display: none;
    height: 100%;
`
const CateroryImg = styled.img.attrs({src: apoImg})`
    width: 128px;
    height: 128px;
    border: 1px solid var(--main-white);
    margin: 5px 0 0 5px;
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
            align-items: center;
        }
        ${StoryInfoContainer}{
            justify-content: space-between;
        }
    }
`

const StoryList = styled.ul`   
`

//간추린 정보
interface IStory {
    storyId: string,//url에 들어갈 story고유 id
    img: string,
    genre: string,
    category: string,
    title: string,
    mainTextSummary: string,
    views: number,//조회수
    likes: number,//좋아요 수
    difficulty: string,//난이도 친화적 중립적 적대적
    uploadDate: string,//게임 업로드일
}
//path="/game-upload/:writerId"
export const GameUploadRoute: React.FC = () => {
    //const {isLoading, data} = useQuery<IStory>("storyListData", fetchStoryList);
    const data = [{storyId: "1", title:"첫번째 게임",views:1000, likes:100, difficulty:"친화적" ,mainTextSummary:"잠든 불씨는 대화재를 꿈꿨다."},
    {storyId: "2", title:"두번째 게임",views:1000, likes:100, difficulty:"중립" ,mainTextSummary:"어둠은 빛이 차지하고 있었던 공간을 빠르게 자신의 것으로 만들었다."},
    {storyId: "3", title:"세번째 게임",views:1000, likes:100, difficulty:"적대적" ,mainTextSummary:"여름 해는 낚싯줄에 걸리기라도 한 듯 중천으로 치솟아 오른다."},
    {storyId: "4", title:"네번째 게임",views:1000, likes:100, difficulty:"친화적" ,mainTextSummary:"나는 내가 운이 좋은 줄 알았다."}];
    const isExist = true;
    const isLoading = false;

    return (
        <Container>
            <HeaderBar />
            <Header>
                <Title>게임 업로드 목록</Title>
            </Header>
            <Main>
                {isLoading ? (<Loader>불러오는 중...</Loader>) : 
                //로딩아닌경우 나눔
                isExist ? 
                (
                    <StoryList>
                        {data?.map( story =>
                        <StoryWrapper>
                            <Story key={story.storyId}>
                                <ImgContainer>
                                    <CateroryImg />
                                </ImgContainer>
                                <StoryInfoContainer>
                                    <StoryTitle>{story.title}</StoryTitle>
                                    <StoryContent>{story.mainTextSummary}</StoryContent>
                                    <LinkContainer>
                                        <SubInfoContainer>
                                            <SubInfo>조회수 {story.views} | 좋아요 {story.likes} | 난이도 {story.difficulty}</SubInfo>
                                        </SubInfoContainer>
                                        <LinkButton>
                                            <Link to={`/game-upload/storyInfo/${story.storyId}`}>
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
                    <StoryList>
                         <StoryEmpty>
                            <StoryTitle>업로드한 에피소드가 없습니다.</StoryTitle>
                            <StoryEmptyContent>나만의 에피소드를 만들고 다른 유저들과 공유해보세요!</StoryEmptyContent>
                            <LinkEmptyContainer>
                                <Link to={"/story-list"}>
                                    <LinkEmptyButton>
                                        에피소드 만들기 &rarr;
                                    </LinkEmptyButton>
                                </Link>
                            </LinkEmptyContainer>
                         </StoryEmpty>
                    </StoryList>
                )
                }
            </Main>
        </Container>
    );
};