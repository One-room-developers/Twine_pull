import * as React from 'react';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import axios from 'axios';

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
    const post_id = 2;

    const getPost = async () => {
        const post = await (await axios.get(`http://localhost:3001/post/search_by_id/${post_id}`)).data;
        setContent(post.data);
    }

    React.useEffect(() => {
        getPost();
    }, []);

    return(
        <Container>
            <HeaderBar />
            <Header>
                <Title>커뮤니티(게시글보기)</Title>
            </Header>
            
            <Main>
                <ul>
                    {content && content.map((post) => (
                        <li key={post.post_id}>{post.writer} {post.title} {post.createdAt} {post.view} {post.like}</li>
                    ))}
                </ul>
            </Main>
        
        </Container>
    );
};