import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderBar } from '../home';

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
  font-size: 35px;
  font-family: "gameBold";
`;
const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const InfoTitle = styled.h1`
  color: var(--main-gray);
  font-size: 25px;
  font-family: "gameBold";
  margin: 20px 0;
`;
const InfoLink = styled.h3`
    font-size: 22px;
    margin-top: 16px;
    text-decoration: underline;
`

export const ExceptionRoute: React.FC = () => {
    return (
        <Container>
            <HeaderBar />
            <Header>
                <Title>찾으시려는 페이지가 존재하지 않습니다.</Title>
            </Header>
            <InfoContainer>
                <InfoTitle>
                    아래의 페이지를 찾으셨나요?
                </InfoTitle>
                <InfoLink>
                    <Link to={"/"}>홈</Link>
                </InfoLink>
                <InfoLink>
                    <Link to={"/board"}>유저 게시판</Link>
                </InfoLink>
                <InfoLink>
                    <Link to={"/select"}>게임 플레이</Link>
                </InfoLink>
                <InfoLink>
                    <Link to={"/story-list"}>에피소드 제작</Link>
                </InfoLink>
                <InfoLink>
                    <Link to={"/game-upload/"}>내가 업로드한 게임 목록</Link>
                </InfoLink>
                <InfoLink>
                    <Link to={"/login"}>로그인</Link>
                </InfoLink>
                <InfoLink>
                    <Link to={"/signup"}>회원가입</Link>
                </InfoLink>
            </InfoContainer>
        </Container>
    );
};