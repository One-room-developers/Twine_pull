import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { HeaderBar } from '../home';
import {useQuery} from "react-query";
import { fetchStoryList } from './api';

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
const Main = styled.div`
    padding: 0px 20px;
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid var(--main-gray);
`
const StoryList = styled.li`   
`


interface IStory {
    
}
//path="/game-upload/:writerId"
export const GameUploadRoute: React.FC = () => {
    //const {isLoading, data} = useQuery<IStory>("storyListData", fetchStoryList);
    const data= [{storyId: "1", title:"첫번째 게임"}, {storyId: "2", title:"두번째 게임"}];
    return (
        <Container>
            <HeaderBar />
            <Header>
                <Title>게임 업로드 목록</Title>
            </Header>
            <Main>
                <StoryList>
                    {data?.map( story=>
                    <Link to={"/"}>{story.storyId}</Link>
                    )}
                </StoryList>
            </Main>
        </Container>
    );
};