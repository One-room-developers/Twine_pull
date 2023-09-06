import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
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
const TestBtn = styled.div`
    width: 100px;
    height: 30px;
    background-color: black;
    color: var(--main-white);
    border: 1px solid var(--main-blue);
    display: flex;
    justify-content: center;
    align-items: center;
`
const Main = styled.div`
`
const TableContainer = styled.table`
    text-align: center;
    border: 1px solid #dddddd;
`
const TableHead = styled.th`
    background-color: #eeeeee;
    text-align: center;
`

export const BoardRoute: React.FC = () => {
    return (
        <Container>
            <HeaderBar />
            <Header>
                <Title>커뮤니티</Title>
            </Header>

                <TestBtn>
                    <Link to={`/board/write`}>전체글</Link>
                </TestBtn>
                <TestBtn>
                    <Link to={`/board/write`}>인기글</Link>
                </TestBtn>
                <TestBtn>
                    <Link to={`/board/write`}>공지</Link>
                </TestBtn>
                <TestBtn>
                    <Link to={`/board/thread/1`}>첫번째글</Link>
                </TestBtn>
                <TestBtn>
                    <Link to={`/board/write`}>글쓰기</Link>
                </TestBtn>
            <Switch>
            <Route path={"/board"}>
                <Main>
                    <TableContainer >
                        <table>
                            <tr>
                                <TableHead>번호</TableHead>
                                <TableHead>제목</TableHead>
                                <TableHead>작성자</TableHead>
                                <TableHead>작성일</TableHead>
                                <TableHead>조회</TableHead>
                                <TableHead>추천</TableHead>
                            </tr>
                        </table>
                    </TableContainer>
                </Main>
            </Route>

            <Route path={"/board/recommend"}></Route>
            </Switch>
        </Container>
    );
};