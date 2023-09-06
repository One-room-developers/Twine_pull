import * as React from 'react';
import styled from 'styled-components';
import { HeaderBar } from '../home';

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

export const ThreadRoute: React.FC = () => {

    const data = async function() {
        const post_id = 1;             // board-route에서 게시물을 클릭할 때 게시물 아이디를 받아서 저장
        
        // axios로 board_id를 보내서 게시물 데이터 받아옴
    }

    return(
        <Container>
            <HeaderBar />
            <Header>
                <Title>커뮤니티(게시글보기)</Title>
            </Header>
            
            <Main>
                {/* 이 Main에 글 읽는 HTML을 만들면 됨*/}

            </Main>
        
        </Container>
    );
};