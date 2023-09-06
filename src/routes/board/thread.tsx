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

    function getPost() {
         // board-route에서 게시물을 클릭할 때 게시물 아이디를 받아서 저장
        const post_id = 2;
        axios.get(`http://localhost:3001/post/search_by_id/${post_id}`)
        .then((res) => {
            const post: Post = res.data;
            console.log(post);
        });
    }

    return(
        <Container>
            <HeaderBar />
            <Header>
                <Title>커뮤니티(게시글보기)</Title>
            </Header>
            
            <Main>
                <button onClick={getPost}>나를 눌러라</button>

            </Main>
        
        </Container>
    );
};