import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { HeaderBar } from '../home';
import { useHistory } from 'react-router-dom';
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
`

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
const WriteContainer = styled.div`
    width: 100%;
    height: 100px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
`


export const WriteRoute: React.FC = () => {
    const history = useHistory();

    const [nickname, setNickname] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");

    const onChangeNickname = React.useCallback((e) => setNickname(e.target.value), []);
    const onChangeTitle = React.useCallback((e) => setTitle(e.target.value), []);
    const onChangeContent = React.useCallback((e) => setContent(e.target.value), []);

    // 데이터가 입력되지 않은 상태에서 실행 안 되게 바꾸고 alert 뜨게 변경해야함
    function regist() {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/post/create`,
            data: {
                writer: nickname,
                title: title,
                content: content,
            },
        })
        .then((res) => {
            if(res.data.successMsg === 20) {
                alert("게시물이 등록되었습니다.");
            }
            else {
                alert("오류");
            }

            history.push("/");
        });
    }

    function cancle() {
        history.push("/board")
    }

    return(
        <Container>
            <HeaderBar />
            <Header>
                <Title>글쓰기</Title>
            </Header>

            <Main>
                <LeftSide>
                    <PopularEpi />
                    <AdContainer />
                </LeftSide>
                <Mid>
                    <WriteContainer>
                        <form className="write-form-grid">
                            <div className="grid-1">
                                <tbody>
                                    <tr>
                                        <td><input className="nickname" type="text" placeholder="닉네임" defaultValue="ㅇㅇ" required onChange={onChangeNickname}></input></td>
                                        <td><input className="title" type="text" placeholder="제목" name="title" required onChange={onChangeTitle}></input></td>
                                        <td><textarea className="content" required onChange={onChangeContent}></textarea></td>
                                    </tr>
                                </tbody>
                            </div>
                            <div className="grid-2">
                                <button className="post-btn" onClick={cancle}>취소</button>
                                <button className="post-btn" onClick={regist}>등록</button>
                            </div>
                        </form>
                    </WriteContainer>
                </Mid>

                <RightSide>
                    <PopularPost />
                    <AdContainer />
                </RightSide>
            </Main>

        </Container>
    );
};