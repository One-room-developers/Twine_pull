import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
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

const TableBody = styled.td`
    background-color: #eeeeee;
    text-align: center;
`

// 일단 만들어둔 인터페이스. 필요하면 사용
interface PostInfo {
    post_id: number,
    writer: string,
    title: string,
    created_at: Date,
    view: number,
    like: number,
};

interface PostList {
    post_info: PostInfo[],
};

export const BoardRoute: React.FC = () => {
    const [board, setBoard] = React.useState([]);
    const post_id = 3;

    const getPostList = async () => {
        const post_list = await (await axios.get(`http://localhost:3001/post/getPostList/${post_id}`)).data;
        setBoard(post_list.data);
    }

    // axios에 pagination이라는 기능이 있는데 페이지 구현할 때 참고하면 좋을듯

    React.useEffect(() => {
        getPostList();
    }, []);

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
                            <thead>
                                <tr>
                                    <TableHead>번호</TableHead>
                                    <TableHead>제목</TableHead>
                                    <TableHead>작성자</TableHead>
                                    <TableHead>작성일</TableHead>
                                    <TableHead>조회</TableHead>
                                    <TableHead>추천</TableHead>
                                </tr>
                            </thead>
                        </table>
                        <ul>
                            {board && board.map((post) => (
                            <li key={post.post_id}>{post.title}</li>
                            ))}
                        </ul>
                    </TableContainer>
                </Main>
            </Route>

            <Route path={"/board/recommend"}></Route>
            </Switch>
        </Container>
    );
};