import * as React from 'react';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import { useQuery } from 'react-query';
import { getPost } from '../api';
//Component
import {AdContainer} from './components/AdContainer';
import { PopularEpi } from './components/PopularEpi';
import { PopularPost } from './components/PopularPost';

const Container = styled.body`
    height: 100vh;
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
    width: 100%;
    min-height: 470px;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(to bottom, var(--main-gray) 40px, var(--main-white) 41px, var(--main-white) 100%);
    padding: 0 80px;
`
const LeftSide = styled.div`
    width: 300px;
`
const RightSide = styled.div`
    width: 300px;
`
const Mid = styled.div`
    width: 720px;
`
const ThreadContainer = styled.div`
    width: 100%;
    height: 100px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
`
const ThreadInfoHeader = styled.div`
    
`
const TitleContainer = styled.div`
    
`
const PostContainer = styled.div`
`
const CommentContainer = styled.div`
`
const SemiInfoContainer = styled.div`
    
`
const LikeBtnContainer = styled.div``

const PostContent = styled.div`
`
const PostTitle = styled.h1`
    font-family: "godicM";
    font-size: 20px;
`
const Loader = styled.h2`
    font-size: 24px;
    font-weight: 500;
`

interface Post {
    post_id: number,
    writer: string,
    category: number,
    title: string,
    content: string,
    created_at: Date,
    view: number,
    like: number,
};

export const ThreadRoute: React.FC = () => {
    const [content, setContent] = React.useState([]);
    const post_id = 1;

    const {isLoading:isPostLoading, data:postData} = useQuery<Post>("post", ()=> getPost(post_id));
    
    return(
        <Container>
            <HeaderBar />
            <Header>
                <Title>커뮤니티</Title>
            </Header>
            
            <Main>
                <LeftSide>
                    <PopularEpi />
                    <AdContainer />
                </LeftSide>
                <Mid>
                    <ThreadContainer>
                        <ThreadInfoHeader>
                            {isPostLoading ? (<Loader>불러오는 중...</Loader>) : (
                                <PostTitle>
                                    {postData.title}
                                </PostTitle>
                            )}
                        </ThreadInfoHeader>
                        <TitleContainer></TitleContainer>
                        <SemiInfoContainer></SemiInfoContainer>
                        <PostContainer>
                            {isPostLoading ? (<></>) : (
                                <PostContent>
                                    {postData.content}
                                </PostContent>
                            )}
                        </PostContainer>
                        <LikeBtnContainer></LikeBtnContainer>
                        
                        <CommentContainer>

                        </CommentContainer>
                    </ThreadContainer>
                </Mid>
                <RightSide>
                    <PopularPost />
                    <AdContainer />
                </RightSide>
            </Main>
        </Container>
    );
};