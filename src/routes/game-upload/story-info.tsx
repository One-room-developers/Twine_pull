import * as React from 'react';
import styled from "styled-components";
import { HeaderBar } from '../home';
import {useParams} from 'react-router-dom';
import { useQuery } from 'react-query';


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
    
`

interface RouteParams{
    storyDbId: string
}

interface IStoryInfo {
    storyId: string,//url에 들어갈 story고유 id
    ifId: string,
    img: string,
    genre: string,
    category: string,
    title: string,
    mainText: string[],//string배열로 해결되는 문제인가?
    
    //option 관련 정보가 너무 많음. 어떤 형식으로 가져올 것인가?

    views: number,
    likes: number,
    difficulty: string,//난이도
    uploadDate: string,//게임 업로드일
}

interface IPassage{
    id:string,
    name:string,
    text_user:string,
}
interface IOption{

}

//path="/game-upload/storyInfo/:storyDbId"
export const StoryInfoRoute: React.FC = () => {
    const { storyDbId } = useParams<RouteParams>();
    //const {isLoading, data} = useQuery<Post>(["story", storyDbId], ()=> passage가져오는함수(parseInt(storyDbId)));

    const passageArr = [{}];

    const isLoading = true;

    return (
        <Container>
            <HeaderBar />
            <Header>
                <Title>스토리 상세 정보</Title>
            </Header>
            <Main>
                {isLoading ? (<Loader>불러오는 중...</Loader>) : 
                (
                    <StoryInfo>
                        
                    </StoryInfo>
                )
                }
            </Main>
        </Container>
    );
};