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

export const WriteRoute: React.FC = () => {

    return(
        <Container>
            <HeaderBar />
            <Header>
                <Title>글쓰기</Title>
            </Header>

            <Main>
            {/* 이 Main에 글 작성 HTML을 만들면 됨*/}

            </Main>

        </Container>
    );
};