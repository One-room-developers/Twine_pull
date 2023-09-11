import * as React from 'react';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import { useQuery } from 'react-query';
import { getPost } from '../api';

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
    display: flex;
    flex-direction: column;
    
`
const PostContainer = styled.div`
`
const CommentContainer = styled.div`
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
                <Title>커뮤니티(게시글보기)</Title>
            </Header>
            
            <Main>
                <PostContainer>
                    {isPostLoading ? (<Loader>불러오는 중...</Loader>) : (
                        <PostTitle>
                            {postData.title}
                        </PostTitle>
                    )}
                </PostContainer>
                <CommentContainer>

                </CommentContainer>
            </Main>
        
        </Container>
    );
};